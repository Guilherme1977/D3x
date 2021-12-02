import Web3 from 'web3'
import axios from 'axios'

export const approve = async(fromToken, wallet, networkID) => {
  const web3 = new Web3(ethereum)

  let url = `https://api.1inch.exchange/v3.0/${networkID}/approve/calldata?infinity=true&tokenAddress=${fromToken}`
  console.log(url)

  let temp = await axios.get(url)
  temp = temp.data

  temp['gas'] = web3.utils.toHex(30000)
  temp['gasPrice'] = web3.utils.toHex(await web3.eth.getGasPrice())

  let val = parseInt(temp['value'])
  val = '0x' + val.toString(16)
  temp['value'] = val
  temp['from'] = wallet

  console.log('approve', temp)

  return temp
}