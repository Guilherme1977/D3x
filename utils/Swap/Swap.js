import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import axios from 'axios'

export const swap = async(fromToken, toToken, slippage, amount, wallet, networkID) => {
  console.log({ fromToken, toToken, slippage, amount, wallet })
  const referrerAddress = '0xb6041f77610643A90B39Ee03d6ad77AeC7B96425' // referrer address for the 0.1% cut
  const referrerFee = 0.1
  const web3 = new Web3(ethereum)
  // convert the .amount to wei
  const number_of_tokens_in_wei = new BigNumber(parseInt(await web3.utils.toWei(parseFloat(amount).toFixed(15).toString(), 'ether')))
  console.log(number_of_tokens_in_wei)

  // call url through the 1INCH dex aggregator
  const callURL = `https://api.1inch.exchange/v3.0/${networkID}/swap?`+ 
    `fromTokenAddress=${fromToken}&` +
    `toTokenAddress=${toToken}&` +
    `amount=${number_of_tokens_in_wei.toFixed()}&` +
    `fromAddress=${wallet}&` +
    `slippage=${slippage}&` +
    `referrerAddress=${referrerAddress}&` +
    `fee=${referrerFee}&` +
    `disableEstimate=true`

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