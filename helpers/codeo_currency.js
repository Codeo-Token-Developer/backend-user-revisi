const axios = require('axios')

const getCurrency = () => {
  return new Promise ((resolve, reject) => {
    axios.get('https://api.coingecko.com/api/v3/coins/codeo-token')
    .then(({data}) => resolve(data.market_data.current_price))
    .catch(err => reject(err))
  })
}

module.exports = getCurrency