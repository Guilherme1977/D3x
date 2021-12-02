import SlippageSelection from './SlippageSelection/SlippageSelection'
import MoreSettings from './MoreSettings/MoreSettings'
import styles from './SettingsMenu.module.scss'

const SettingsMenu = ({nonce, setNonce, gas, setGas, slippage, setSlippage}) => {
  return (
    <div className={styles.settingsMenu}>
      <SlippageSelection styles={styles} slippage={slippage} setSlippage={setSlippage} />

      <MoreSettings 
        nonce={nonce}
        setNonce={setNonce}
        gas={gas}
        setGas={setGas} />
    </div>
  )
}

export default SettingsMenu
