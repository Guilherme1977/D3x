import styles from './Coin.module.scss'
import { useEffect, useState } from 'react'
import { get_balance } from '../../../utils/Swap/GetBalance'
import SwapList from '../SwapList/SwapList'

const Coin = ({tokens, wallet, coin, setCoin, fromCoin, fromCoinInput, coin2Input, setCoin2Input, toCoinBalance, setToCoinBalance, getSwapPairPrice}) => {
  const [swapMenu, setSwapMenu] = useState(false)

  const getCoinBalance = async() => setToCoinBalance(wallet ? parseFloat(await get_balance(coin?.symbol, coin?.address, wallet)) : 0)

  useEffect(() => {
    wallet && getCoinBalance()
  }, [coin])

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.coin} onClick={() => setSwapMenu(true)}>
          <img src={coin?.logoURI} alt='' />
          <p>{coin?.symbol}</p>
          <i className='far fa-chevron-down'></i>
        </div>
          
        {coin2Input === 'loading' ? 
          <i className={`fa fa-spinner-third ${styles.inputSpinner}`}></i> 
        :
          <p className={styles.input}>{coin2Input}</p>
        }
      </div>

      <div className={styles.bottom}>
        <p>Balance: {toCoinBalance.toFixed(4)} {coin?.symbol}</p>
        
        <div className={styles.calculate} onClick={() => getSwapPairPrice(fromCoin, coin, fromCoinInput)}>
          <i className='fad fa-calculator-alt'></i>
        </div>
      </div>

      {swapMenu &&
        <SwapList 
          tokens={tokens}
          setSwapMenu={setSwapMenu}
          setCoin={setCoin} />}
    </div>
  )
}

export default Coin
