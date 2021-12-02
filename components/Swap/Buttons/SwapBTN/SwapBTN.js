import styles from './SwapBTN.module.scss'
import { useState } from 'react'
import { swap } from '../../../../utils/Swap/Swap'
import { waitTransaction } from '../../../../utils/Swap/WaitTransaction'

const SwapBTN = ({disabled, fromCoin, toCoin, fromCoinInput, networkID, slippage, rest}) => {
  const [loader, setLoader] = useState(false)

  const validate = () => {
    if(['', '0'].includes(fromCoinInput)) return
    
    swapTokens()
  }

  const swapTokens = async() => {
    setLoader(true)
    let data = await swap(fromCoin.address, toCoin.address, slippage, fromCoinInput, rest.user.address, networkID)

    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [data.tx],
      })
      .then(async(result) => {
        await waitTransaction(result)
        setLoader(false)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    window.ethereum && rest.user ?
      fromCoin?.address != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ?
        <button 
          onClick={() => validate()}
          className={`${styles.btn} ${disabled && styles.disabled}`}>
          <i className='fad fa-route'></i>
          Swap
        </button>
      :
        <button 
          onClick={() => !disabled ? validate() : null}
          className={styles.btn}>
          {loader ? 
            <>
              <i className={`fad fa-spinner-third ${styles.spin}`}></i>
              Swapping
            </>
          : 
            <>
              <i className='fad fa-route'></i>
              Swap
            </>
          }

        </button>
    :
      <button
        className={`${styles.btn} ${styles.disabled}`}>
        Connect Metamask
      </button>
  )
}

export default SwapBTN
