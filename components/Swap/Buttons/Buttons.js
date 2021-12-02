import styles from './Buttons.module.scss'
import ApproveBTN from './ApproveBTN/ApproveBTN'
import SwapBTN from './SwapBTN/SwapBTN'
import { useState } from 'react'

const Buttons = ({fromCoin, toCoin, fromCoinInput, networkID, setApprovalInfo, slippage, rest}) => {
  const [approved, setApproved] = useState(false)

  return (
    <div className={styles.buttons}>
      {fromCoin.address != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
        <ApproveBTN 
          fromCoin={fromCoin}
          networkID={networkID}
          setApprovalInfo={setApprovalInfo}
          approved={approved}
          setApproved={setApproved}
          rest={rest} />}

      <SwapBTN 
        disabled={approved}
        fromCoin={fromCoin}
        toCoin={toCoin}
        fromCoinInput={fromCoinInput}
        networkID={networkID}
        slippage={slippage}
        rest={rest} />
    </div>
  )
}

export default Buttons
