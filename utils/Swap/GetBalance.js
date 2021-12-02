import Web3 from 'web3'

export const get_balance = async(symbol, tokenAddress, walletAddress) => {
  const web3 = new Web3(ethereum)

  if(symbol === 'BNB' || symbol === 'ETH') {
    let balance = await web3.eth.getBalance(walletAddress)
    return web3.utils.fromWei(balance)
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
  
    let contract = new web3.eth.Contract(minABI, tokenAddress)

    async function getBalance() {
      let balance = await contract.methods.balanceOf(walletAddress).call()
      let decimals = await contract.methods.decimals().call()
      return balance / (10 ** decimals);
    }

    return await getBalance()
  }
}