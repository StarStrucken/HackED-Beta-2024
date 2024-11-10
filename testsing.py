import yfinance as yf

if __name__ == "__main__":
    ticker = "AAPL"
    data = yf.download(ticker, period="1y")
    print(data['Adj Close'])