import styles from '../styles/swap.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import FromCoin from '../components/Swap/FromCoin/Coin'
import ToCoin from '../components/Swap/ToCoin/Coin'
import ApprovedHashMessage from '../components/Swap/ApprovedHashMessage/ApprovedHashMessage'
import SwapSymbol from '../components/Swap/SwapSymbol'
import SettingsMenu from '../components/Swap/SettingsMenu/SettingsMenu'
import Buttons from '../components/Swap/Buttons/Buttons'

const swap = ({...rest}) => {
  const [tokens, setTokens] = useState(null)
  const [coin1, setCoin1] = useState(null)
  const [coin2, setCoin2] = useState(null)
  const [coin1Input, setCoin1Input] = useState('0')
  const [coin2Input, setCoin2Input] = useState('0')
  const [menu, setMenu] = useState(false)
  const [approvedHash, setApprovedHash] = useState()
  const [approvedLoader, setApprovedLoader] = useState(false)
  const [approvedSwapLoader, setApprovedSwapLoader] = useState(false)

  const [loader, setLoader] = useState(true)
  const [networkID, setNetworkID] = useState(1)
  const [fromCoinBalance, setFromCoinBalance] = useState(0)
  const [toCoinBalance, setToCoinBalance] = useState(0)
  const [approvalInfo, setApprovalInfo] = useState()
  const [slippage, setSlippage] = useState(1)
  const [nonce, setNonce] = useState()
  const [gas, setGas] = useState(300000)

  const fetchTokens = async() => {
    let chainId
    if(window.ethereum) {
      let net = await ethereum.request({ method: 'eth_chainId' })
      chainId = net == '0x38' ? 56 : 1 // 0x38 = BSC | 0x1 = ETH Mainnet
      setNetworkID(chainId)
    } else {
      chainId = 56
      setNetworkID(chainId)
    }

    let res = await axios.get(`https://api.1inch.exchange/v3.0/${chainId}/tokens`)
    const { data } = res 
    setTokens(data.tokens)
    setCoin1(data.tokens['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'])
    setCoin2(networkID == 1 ? data.tokens['0xdac17f958d2ee523a2206206994597c13d831ec7'] : data.tokens['0x55d398326f99059ff775485246999027b3197955'])
  }

  const getSwapPairPrice = async(fromPair, toPair, fromPairInput) => {
    const res = await axios.get(`https://api.1inch.exchange/v3.0/${networkID}/quote?fromTokenAddress=${fromPair.address}&toTokenAddress=${toPair.address}&amount=${fromPairInput * 10 ** fromPair.decimals}`)
    const data = await res.data

    let finalPrice = data.toTokenAmount / (10 ** data.toToken.decimals)
    setCoin2Input(finalPrice)
  }

  useEffect(async() => {
    await fetchTokens()
    setLoader(false)
  }, [networkID])

  return (
    !loader ?
      <div className={styles.swapWrapper}>
        <div className={styles.swap}>
          <div className={styles.menu}>
            <div className={styles.top}>
              <div className={styles.cog} onClick={() => setMenu(!menu)}>
                <i className='far fa-cog'></i>
              </div>
            </div>

            {menu && <SettingsMenu 
              nonce={nonce}
              setNonce={setNonce}
              gas={gas}
              setGas={setGas}
              slippage={slippage} 
              setSlippage={setSlippage} />}
          </div>

          {coin1 && 
            <FromCoin 
              tokens={tokens}
              wallet={rest.user?.address} 
              coin={coin1}
              setCoin={setCoin1}
              toToken={coin2}
              network={networkID}
              coin1Input={coin1Input} 
              setCoin1Input={setCoin1Input} 
              setToPairPrice={setCoin2Input}
              getSwapPairPrice={getSwapPairPrice}
              fromCoinBalance={fromCoinBalance}
              setFromCoinBalance={setFromCoinBalance}
              styles={styles} 
              key={coin1} />}
            {/* Change ToCoin based to FromCoin */}

          <SwapSymbol 
            styles={styles}
            fromPair={coin1}
            toPair={coin2}
            setFromPair={setCoin1}
            setToPair={setCoin2}
            inputPriceFrom={coin1Input}
            inputPriceTo={coin2Input}
            setInputPriceFrom={setCoin1Input}
            setInputPriceTo={setCoin2Input}
            fromCoinBalance={fromCoinBalance}
            setFromCoinBalance={setFromCoinBalance}
            toCoinBalance={toCoinBalance}
            setToCoinBalance={setToCoinBalance} />
          
          {coin2 && 
            <ToCoin 
              tokens={tokens}
              wallet={rest.user?.address} 
              coin={coin2} 
              setCoin={setCoin2}
              fromCoin={coin1}
              fromCoinInput={coin1Input}
              network={networkID}
              coin2Input={coin2Input} 
              setCoin2Input={setCoin2Input} 
              getSwapPairPrice={getSwapPairPrice}
              toCoinBalance={toCoinBalance}
              setToCoinBalance={setToCoinBalance}
              styles={styles} />}

          <div className={styles.slippageTolerance}>
            <p>Slippage Tolerance</p>
            <p>{slippage}%</p>
          </div>

            {/* <div className={coin1 && coin1.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ? `${styles.transactionButtons} ${styles.transactionButtonsGrid}` : styles.transactionButtons}>
              {coin1 && coin1.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' && <div className={styles.button} onClick={approveTokens}>
                <i className={approvedLoader ? `fa fa-spinner-third ${styles.inputSpinner}` : 'fad fa-wand-magic'}></i>
                <p>Approve</p>
              </div>}
              <div className={`${styles.button} ${coin1Input == '' && styles.disabled}`}  
                onClick={coin1Input !== '' ? swapTokens : console.log('can not swap - empty input')}>
                <i className={approvedSwapLoader ? `fa fa-spinner-third ${styles.inputSpinner}` : 'fad fa-route'}></i>
                <p>{coin1Input === '' ? 'Enter Amount' : 'Swap'}</p>
              </div>
            </div> */}

          <Buttons 
            fromCoin={coin1}
            fromCoinInput={coin1Input}
            toCoin={coin2}
            networkID={networkID}
            setApprovalInfo={setApprovalInfo}
            slippage={slippage}
            rest={rest} />

          {approvedHash && 
            <ApprovedHashMessage 
              approvedHash={approvedHash} 
              setApprovedHash={setApprovedHash}
              networkId={networkID} />}
        </div>
      </div>
    : null
  )
}

export default swap