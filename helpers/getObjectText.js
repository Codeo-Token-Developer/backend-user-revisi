
const generateText = (currency) => {
    switch (currency) {

        case 'btc':
            return 'BTC_coin'
        case 'usd':
            return 'balance'
        case 'eth':
            return 'ETH_coin'
        case 'bnb':
            return 'BNB_coin'
        case 'ltc':
            return 'LTC_coin'
        case 'codeo': 
            return 'CODEO_coin'
        case 'trx':
            return 'TRX_coin'
        
    }
};


module.exports = { generateText }