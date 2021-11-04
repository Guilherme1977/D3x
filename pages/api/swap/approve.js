import axios from 'axios';
import Web3 from 'web3'

export default async function handler(req, res) {
  const { fromToken, address, network } = req.body
  // network provider selection
  const chainId = network
  const INFURA_KEY = process.env.NEXT_INFURA_KEY
  const eth_provider = `https://mainnet.infura.io/v3/${INFURA_KEY}`
  const bsc_provider = 'https://bsc-dataseed1.binance.org:443'
  const provider = chainId == 56 ? bsc_provider : eth_provider
  const web3 = new Web3(provider)

  async function approve() {
    let url = `https://api.1inch.exchange/v3.0/${chainId}/approve/calldata?infinity=true&tokenAddress=` + fromToken;
    console.log(url)

    let temp = await axios.get(url);
    temp = temp.data;

    temp['gas'] = web3.utils.toHex(30000)
    temp['gasPrice'] = web3.utils.toHex(await web3.eth.getGasPrice())

    let val = parseInt(temp["value"])
    val = '0x' + val.toString(16)
    temp["value"] = val
    temp['from'] = address

    console.log('approve', temp)

    return temp; 
  }

  res.status(200).json(await approve())
}