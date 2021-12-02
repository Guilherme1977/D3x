import styles from './ApproveBTN.module.scss'
import { useEffect, useState } from 'react'
import { approve } from '../../../../utils/Swap/Approve'
import { waitTransaction } from '../../../../utils/Swap/WaitTransaction'
import Web3 from 'web3'

let abi = [{
    "constant": true,
    "inputs": [{"name": "_owner","type": "address"},{"name": "_spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"name": "","type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}]

const ApproveBTN = ({fromCoin, networkID, setApprovalInfo, approved, setApproved, rest}) => {
  const [approveLoading, setApproveLoading] = useState(false)

  const get_approved = async() => {
    const web3 = new Web3(ethereum)
    const contract = new web3.eth.Contract(abi, fromCoin.address)
    const allowance = await contract.methods.allowance(rest.user.address, '0x11111112542d85b3ef69ae05771c2dccff4faa26').call();
    setApproved(!(allowance > 0))
    console.log(allowance)
  }

  const approve_spending = async() => {
    if(!rest.ethereumAvailability) return 0
    
    setApproveLoading(true)
    let res = await approve(fromCoin.address, rest.user.address, networkID)
    
    await ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [res],
      })
      .then(async(result) => {
        let res2 = await waitTransaction(result)

        setApprovalInfo(res2)
        setApproved(res2.approved)
        setApproveLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setApproved(false)
        setApproveLoading(false)
      });
      
    setApproveLoading(false)
  }

  useEffect(async() => {
    await get_approved()
  }, [fromCoin])

  return (
    !approved ? null
    :
      <button className={styles.btn} onClick={() => approve_spending()}>
        {approveLoading ? 
          <>
            <i className={`fad fa-spinner-third ${styles.spin}`}></i>
            Approving
          </>
        : 
          <>
            <i className='fad fa-wand-magic'></i>
            Approve
          </>
        }
      </button>
  )
}

export default ApproveBTN
