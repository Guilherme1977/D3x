import styles from './Coin.module.scss'
import { useEffect, useState } from 'react'
import { get_balance } from '../../../utils/Swap/GetBalance'
import SwapList from '../SwapList/SwapList'

const Coin = ({tokens, wallet, coin, setCoin, toToken, coin1Input, setCoin1Input, setToPairPrice, fromCoinBalance, setFromCoinBalance, getSwapPairPrice}) => {
  const [swapMenu, setSwapMenu] = useState(false)

  const getCoinBalance = async() => setFromCoinBalance(wallet ? parseFloat(await get_balance(coin?.symbol, coin?.address, wallet)) : 0)

  const validate = (value) => {
    // if((!['', '0.', '0'].includes(value) && !/0*\.0*/.test(value)) || /0*\.0*[1-9]+/.test(value)) {
      
    //   getSwapPairPrice(coin, toToken, value)
    //   return
    // } 

    // setToPairPrice('0')
  }

  useEffect(() => {
    if(wallet !== null)
      getCoinBalance()
  }, [coin])

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.coin} onClick={() => setSwapMenu(true)}>
          <img src={coin?.logoURI} alt='' />
          <p>{coin?.symbol}</p>
          <i className='far fa-chevron-down'></i>
        </div>
        
        <input 
          type='number'
          placeholder={0.0} 
          value={coin1Input}
          onChange={e => {setCoin1Input(e.target.value); validate(e.target.value)}} />
      </div>

      <div className={styles.bottom}>
        <p>Balance: {fromCoinBalance.toFixed(4)} {coin?.symbol}</p>
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
