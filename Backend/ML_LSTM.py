import yfinance as yf
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import tensorflow as tf

class StockPredictor:
    def __init__(self):
        self.default_tickers = [
            ['Meta-META', 'META'],
            ['Apple-AAPL', 'AAPL'],
            ['Amazon-AMZN', 'AMZN'],
            ['Netflix-NFLX', 'NFLX'],
            ['Google-GOOGL', 'GOOGL'],
        ]
    
    def download_stock_data(self, ticker):
        try:
            end_date = datetime.now()
            start_date = end_date - timedelta(days=2*365)
            
            data = yf.download(ticker, start_date, end_date)
            if data.empty:
                raise ValueError(f"No data found for ticker {ticker}")
            return data
        except Exception as e:
            print(f"Error downloading data: {e}")
            return None

    def split_data(self, data, train_ratio=0.8):
        n = len(data)
        train_size = int(n * train_ratio)
        train_data = data[:train_size]
        test_data = data[train_size:]
        return train_data, test_data, train_size

    def normalize_data(self, train_data, test_data):
        train_mean = train_data.mean()
        train_std = train_data.std()
        
        train_normalized = (train_data - train_mean) / train_std
        test_normalized = (test_data - train_mean) / train_std
        
        return train_normalized, test_normalized, train_mean, train_std
    
    def create_sequences(self, data, history_size):
        sequences = []
        targets = []
        
        for i in range(len(data) - history_size):
            end_ix = i + history_size
            seq = data[i:end_ix]
            target = data[end_ix]
            sequences.append(seq.reshape((history_size, 1)))
            targets.append(target)
            
        return np.array(sequences), np.array(targets)
    
    def create_future_sequence(self, data, history_size):
        return data[-history_size:].reshape((1, history_size, 1))
    
    def build_model(self, input_shape):
        tf.random.set_seed(8888)
        model = tf.keras.models.Sequential([
            tf.keras.layers.LSTM(64, input_shape=input_shape, return_sequences=True),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.LSTM(32),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(1)
        ])
        model.compile(optimizer='adam', loss='mse')
        return model
    
    def predict_future(self, model, last_sequence, n_steps, train_mean, train_std):
        future_predictions = []
        current_sequence = last_sequence.copy()
        
        for _ in range(n_steps):
            next_pred = model.predict(current_sequence)[0][0]
            future_predictions.append(next_pred)
            
            current_sequence = np.roll(current_sequence, -1, axis=1)
            current_sequence[0, -1, 0] = next_pred
        
        future_predictions = np.array(future_predictions) * train_std + train_mean
        return future_predictions
    
    def get_predictions_dict(self, future_dates, future_pred):
        """Convert predictions and dates into a dictionary"""
        return {
            date.strftime('%Y-%m-%d'): float(price)
            for date, price in zip(future_dates, future_pred)
        }

def main():
    predictor = StockPredictor()
    ticker = predictor.get_user_selection()
    
    data = predictor.download_stock_data(ticker)
    if data is None:
        return
    
    prices = data['Adj Close'].values
    dates = data.index
    
    train_data, test_data, split_idx = predictor.split_data(prices)
    train_dates = dates[:split_idx]
    test_dates = dates[split_idx:]
    
    train_normalized, test_normalized, train_mean, train_std = predictor.normalize_data(train_data, test_data)
    
    history_size = 20
    X_train, y_train = predictor.create_sequences(train_normalized, history_size)
    X_test, y_test = predictor.create_sequences(test_normalized, history_size)
    
    train_dates = train_dates[history_size:]
    test_dates = test_dates[history_size:]
    
    print("\nTraining model...")
    model = predictor.build_model(X_train.shape[1:])
    
    history = model.fit(
        X_train, y_train,
        epochs=25,
        batch_size=32,
        validation_split=0.1,
        verbose=1
    )
    
    train_pred = model.predict(X_train)
    test_pred = model.predict(X_test)
    
    train_pred = train_pred * train_std + train_mean
    test_pred = test_pred * train_std + train_mean
    train_actual = y_train * train_std + train_mean
    test_actual = y_test * train_std + train_mean
    
    last_sequence = predictor.create_future_sequence(
        np.concatenate([train_normalized, test_normalized]),
        history_size
    )
    
    last_date = dates[-1]
    future_dates = [last_date + timedelta(days=i+1) for i in range(7)]
    
    future_pred = predictor.predict_future(model, last_sequence, 7, train_mean, train_std)
    
    # Get predictions dictionary directly without plotting
    predictions_dict = predictor.get_predictions_dict(future_dates, future_pred)
    
    print("\nPredictions dictionary:")
    print(predictions_dict)
    
    return predictions_dict
