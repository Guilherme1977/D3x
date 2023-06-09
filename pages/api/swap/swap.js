import axios from 'axios';
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

export default async function handler(req, res) {
  const { fromToken, toToken, slippage, amount, network, address } = req.body
  console.log({ fromToken, toToken, slippage, amount, network, address })
  const referrerAddress = '0x7348e031698eE8D3C3451a9B1F71A5779b1e62e2' // referrer address for the 0.1% cut
  const referrerFee = 0.1
  // network provider selection
  const chainId = network
  const INFURA_KEY = process.env.NEXT_INFURA_KEY
  const eth_provider = `https://mainnet.infura.io/v3/${INFURA_KEY}`
  const bsc_provider = 'https://bsc-dataseed1.binance.org:443'
  const provider = chainId == 56 ? bsc_provider : eth_provider
  const web3 = new Web3(provider)
  // convert the .amount to wei
  const number_of_tokens_in_wei = new BigNumber(parseInt(await web3.utils.toWei(parseFloat(amount).toFixed(15).toString(), 'ether')))
  console.log(number_of_tokens_in_wei)

  // call url through the 1INCH dex aggregator
  const callURL = `https://api.1inch.exchange/v3.0/${chainId}/swap?`+ 
    `fromTokenAddress=${fromToken}&` +
    `toTokenAddress=${toToken}&` +
    `amount=${number_of_tokens_in_wei.toFixed()}&` +
    `fromAddress=${address}&` +
    `slippage=${slippage}&` +
    `referrerAddress=${referrerAddress}&` +
    `fee=${referrerFee}&` +
    `disableEstimate=true`

  async function swap() {
    console.log(callURL)
    let temp = await axios.get(callURL)
    temp = temp.data

    let value = parseInt(temp.tx['value'])
    value = '0x' + value.toString(16)
    temp.tx['value'] = value

    temp.tx['gas'] = web3.utils.toHex(300000)
    temp.tx['gasPrice'] = web3.utils.toHex(await web3.eth.getGasPrice())
    return temp
  }

  res.status(200).json(await swap())
}
