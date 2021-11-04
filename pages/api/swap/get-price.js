import axios from 'axios'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'

export default async function handler(req, res) {
  const { amount, network, fromToken, toToken } = req.body
  // network provider selection
  const chainId = network
  const INFURA_KEY = process.env.NEXT_INFURA_KEY
  const eth_provider = `https://mainnet.infura.io/v3/${INFURA_KEY}`
  const bsc_provider = 'https://bsc-dataseed1.binance.org:443'
  const provider = chainId == 56 ? bsc_provider : eth_provider
  const web3 = new Web3(provider)

  const number_of_tokens_in_wei = new BigNumber(parseInt(await web3.utils.toWei(parseFloat(amount).toFixed(15).toString(), 'ether')))

  const url = `https://api.1inch.exchange/v3.0/${chainId}/quote?` +
    `fromTokenAddress=${fromToken}&` +
    `toTokenAddress=${toToken}&` +
    `amount=${number_of_tokens_in_wei.toFixed()}`

  const response = await axios.get(url)

  response.data['toTokenAmountFromWei'] = await web3.utils.fromWei(response.data.toTokenAmount)

  res.status(200).json(response.data)
}