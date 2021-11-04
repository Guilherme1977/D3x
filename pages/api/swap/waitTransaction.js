import axios from 'axios';
import Web3 from 'web3'

export default async function handler(req, res) {
  const { txHash, network } = req.body
  // network provider selection
  const chainId = network
  const INFURA_KEY = process.env.NEXT_INFURA_KEY
  const eth_provider = `https://mainnet.infura.io/v3/${INFURA_KEY}`
  const bsc_provider = 'https://bsc-dataseed1.binance.org:443'
  const provider = chainId == 56 ? bsc_provider : eth_provider
  const web3 = new Web3(provider)
  let tx = null;
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  while (tx == null) {
    tx = await web3.eth.getTransactionReceipt(txHash);
    console.log('again',tx)
    await sleep(2000);
  }

  console.log("Transaction " + txHash + " was mined.");

  res.status(200).json({approved: tx.status, hash: txHash})
}