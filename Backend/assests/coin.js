// cryptoData.js

// Mapping cryptocurrency symbols to their image URLs
const cryptoImages = {
	BTCUSDT: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
	ETHUSDT: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
	XRPUSDT: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
	LTCUSDT: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
	ADAUSDT: "https://cryptologos.cc/logos/cardano-ada-logo.png",
	DOGEUSDT: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
	XEMUSDT: "https://cryptologos.cc/logos/monero-xmr-logo.png",
	TRXUSDT: "https://cryptologos.cc/logos/tron-trx-logo.png",
	BNBUSDT: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
	SOLUSDT: "https://cryptologos.cc/logos/solana-sol-logo.png",
	MATICUSDT: "https://cryptologos.cc/logos/polygon-matic-logo.png",
	ETHBTC: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
	DASHUSDT: "https://cryptologos.cc/logos/dash-dash-logo.png",
	EOSUSDT: "https://cryptologos.cc/logos/eos-eos-logo.png",
	BCHUSDT: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png",
	XLMUSDT: "https://cryptologos.cc/logos/stellar-xlm-logo.png",
	ZECUSDT: "https://cryptologos.cc/logos/zcash-zec-logo.png",
	FILUSDT: "https://cryptologos.cc/logos/filecoin-fil-logo.png",
	UNIUSDT: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
	AVAXUSDT: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
	NEARUSDT: "https://cryptologos.cc/logos/nearprotocol-near-logo.png",
};

// Mapping cryptocurrency symbols to their names
const cryptoNames = {
	BTCUSDT: "Bitcoin",
	ETHUSDT: "Ethereum",
	XRPUSDT: "XRP",
	LTCUSDT: "Litecoin",
	ADAUSDT: "Cardano",
	DOGEUSDT: "Dogecoin",
	XEMUSDT: "Monero",
	TRXUSDT: "TRON",
	BNBUSDT: "Binance Coin",
	SOLUSDT: "Solana",
	MATICUSDT: "Polygon",
	ETHBTC: "Ethereum/BTC",
	DASHUSDT: "Dash",
	EOSUSDT: "EOS",
	BCHUSDT: "Bitcoin Cash",
	XLMUSDT: "Stellar",
	ZECUSDT: "ZCash",
	FILUSDT: "Filecoin",
	UNIUSDT: "Uniswap",
	AVAXUSDT: "Avalanche",
	NEARUSDT: "NEAR Protocol",
};

// Export the objects so they can be used in other files
module.exports = { cryptoImages, cryptoNames };
