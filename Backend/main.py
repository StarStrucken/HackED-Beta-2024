from flask import jsonify, request
import yfinance as yf

from concurrent.futures import ThreadPoolExecutor
from flask import Flask
from flask_cors import CORS
from ML_LSTM import StockPredictor
from datetime import timedelta
import numpy as np

executor = ThreadPoolExecutor()

app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["GET"])
async def get_prediction():
    predictor = StockPredictor()
    ticker = request.args.get("ticker")

    data = predictor.download_stock_data(ticker)
    if data is None:
        return jsonify({"error": "No data found"}), 404

    prices = data["Adj Close"].values
    dates = data.index

    train_data, test_data, split_idx = predictor.split_data(prices)
    train_dates = dates[:split_idx]
    test_dates = dates[split_idx:]

    train_normalized, test_normalized, train_mean, train_std = predictor.normalize_data(
        train_data, test_data
    )

    history_size = 20
    X_train, y_train = predictor.create_sequences(train_normalized, history_size)
    X_test, y_test = predictor.create_sequences(test_normalized, history_size)

    train_dates = train_dates[history_size:]
    test_dates = test_dates[history_size:]

    print("\nTraining model...")
    model = predictor.build_model(X_train.shape[1:])

    history = model.fit(
        X_train, y_train, epochs=25, batch_size=32, validation_split=0.1, verbose=1
    )

    train_pred = model.predict(X_train)
    test_pred = model.predict(X_test)

    train_pred = train_pred * train_std + train_mean
    test_pred = test_pred * train_std + train_mean
    train_actual = y_train * train_std + train_mean
    test_actual = y_test * train_std + train_mean

    last_sequence = predictor.create_future_sequence(
        np.concatenate([train_normalized, test_normalized]), history_size
    )

    last_date = dates[-1]
    future_dates = [last_date + timedelta(days=i + 1) for i in range(7)]
    future_pred = predictor.predict_future(
        model, last_sequence, 7, train_mean, train_std
    )
    predictions_dict = predictor.get_predictions_dict(future_dates, future_pred)

    print("\nPredictions dictionary:")
    print(predictions_dict)

    return jsonify(predictions_dict), 200


async def fetch_stock_data_async(ticker, columns):
    stock = yf.download(ticker, period="1y")

    if not stock.empty:
        data = stock[columns]
        return data
    return {}


@app.route("/data", methods=["GET", "POST"])
async def post_visualization_data():
    print(f"Request method: {request.method}")

    if request.method == "POST":
        data = request.json
        identifier = data.get("identifier")
        columns = data.get("columns", [])
    else:  # GET request
        identifier = request.args.get("ticker")
        columns = request.args.getlist("column")

    print(f"Received identifier: {identifier}, columns: {columns}")

    if not identifier:
        return jsonify({"error": "Missing identifier"}), 400
    if not columns:
        return jsonify({"error": "Missing columns parameter"}), 400

    try:
        stock_data = await fetch_stock_data_async(identifier, columns)
        if stock_data.empty: 
            return jsonify({'error': 'No data found'}), 404
        return jsonify({'data': stock_data.to_dict(orient="list")}), 200
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
