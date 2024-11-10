from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
import yfinance as yf

app = Flask(__name__)
CORS(app)

async def fetch_stock_data_async(ticker, columns):
    """Fetch stock data asynchronously from Yahoo Finance."""
    stock = yf.Ticker(ticker)
    # Using asyncio.to_thread to run blocking I/O operation in a separate thread
    hist = await asyncio.to_thread(stock.history, period="1y")
    
    if not hist.empty:
        data = hist[columns].dropna().to_dict(orient="list")
        return data
    return {}

@app.route('/forecast', methods=['GET'])
def forecast():
    ticker = request.args.get('ticker')
    if not ticker:
        return jsonify({'error': 'Missing ticker parameter'}), 400

    print("Received ticker:", ticker)
    try:
        return jsonify({'forecast': f'This is the forecast for {ticker}'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/data', methods=['POST'])
async def post_visualization_data():
    """Endpoint to get stock data asynchronously for visualization."""
    # Read JSON data from the request body
    data = request.json
    identifier = data.get('identifier')
    columns = data.get('columns', [])  # Expecting columns as a list

    if not identifier:
        return jsonify({'error': 'Missing identifier'}), 400
    if not columns:
        return jsonify({'error': 'Missing columns parameter'}), 400

    try:
        # Fetch stock data asynchronously
        stock_data = await fetch_stock_data_async(identifier, columns)
        return jsonify({'identifier': identifier, 'data': stock_data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
