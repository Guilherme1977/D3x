import Web3 from 'web3'
require('dotenv').config()

export default async function handler(req, res) {
  const { symbol, tokenAddress, walletAddress, network } = req.body
  // network provider selection
  const chainId = network == '0x38' ? 56 : 1 // 0x38 = BSC | 0x1 = ETH Mainnet
  const INFURA_KEY = process.env.NEXT_INFURA_KEY
  const eth_provider = `https://mainnet.infura.io/v3/${INFURA_KEY}`
  const bsc_provider = 'https://bsc-dataseed1.binance.org:443'
  const provider = chainId == 56 ? bsc_provider : eth_provider
  const web3 = new Web3(provider)

  if(symbol === 'BNB' || symbol === 'ETH' || symbol === 'MATIC') {
    let balance = await web3.eth.getBalance(walletAddress)
    res.status(200).json(web3.utils.fromWei(balance))
  } else {
    // The minimum ABI to get ERC20 Token balance
    let minABI = [
      // balanceOf
      {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
      },
      // decimals
      {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
      }
    ];
  
    let contract = new web3.eth.Contract(minABI, tokenAddress);
    async function getBalance() {
      let balance = await contract.methods.balanceOf(walletAddress).call();
      let decimals = await contract.methods.decimals().call()
      return balance / (10 ** decimals);
    }

    res.status(200).json(await getBalance())
  }
}