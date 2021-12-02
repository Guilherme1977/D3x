import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './Coin.module.scss'

const Coin = ({wallet, coin, network, coin1Input, setCoin1Input, coin2Input, setCoin2Input, setSwapMenu, getSwapPairPrice}) => {
  const [balance, setBalance] = useState(0)

  const getCoinBalance = async() => {
    let res = await axios.post('/api/get-balance', {
      tokenAddress: coin?.address,
      walletAddress: wallet,
      network: network,
      symbol: coin?.symbol
    })
    
    setBalance(res.data)
  }

  useEffect(() => {
    if(wallet !== null)
      getCoinBalance()
  }, [])

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.coin} onClick={() => setSwapMenu(true)}>
          <img src={coin?.logoURI} alt='' />
          <p>{coin?.symbol}</p>
          <i className='far fa-chevron-down'></i>
        </div>
        
        {coin1Input !== false ?
          <input 
            type='number'
            placeholder={0.0} 
            value={coin1Input} 
            // onKeyPress={getSwapPairPrice}
            onChange={e => setCoin1Input(e.target.value)} />
        :
          coin2Input === 'loading' ? <i className={`fa fa-spinner-third ${styles.inputSpinner}`}></i> :
          <input 
            placeholder={0.0} 
            value={coin2Input} 
            onChange={e => setCoin2Input(e.target.value)} />
        }
      </div>

      <div className={styles.bottom}>
        <p>Balance: {balance.toFixed(4)} {coin?.symbol}</p>
        {coin1Input === false &&
          <div className={styles.calculate} onClick={getSwapPairPrice}>
            <i className='fad fa-calculator-alt'></i>
          </div>
        }
      </div>
    </div>
  )
}

export default Coin
