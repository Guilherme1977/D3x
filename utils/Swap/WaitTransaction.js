import Web3 from 'web3'

export const waitTransaction = async(txHash) => {
  const web3 = new Web3(ethereum)
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

  return {approved: tx.status, hash: txHash}
}