import yfinance as yf

def main():
    ticker = "AAPL"
    print(yf.Ticker(ticker).history())


if __name__ == "__main__":
    main()