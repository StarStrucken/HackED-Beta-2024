from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 


@app.route('/forecast', methods=['GET'])
def forecast():
    ticker = request.args.get('ticker')
    if not ticker:
        return jsonify({'error': 'Missing ticker parameter'}), 400

    ticker = str(ticker)
    print("Received ticker:", ticker)

    try:
        return jsonify({'forecast': 'This is the forecast for ' + ticker}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)

