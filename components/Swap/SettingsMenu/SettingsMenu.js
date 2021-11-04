import SlippageSelection from './SlippageSelection/SlippageSelection'
import MoreSettings from './MoreSettings/MoreSettings'
import styles from './SettingsMenu.module.scss'

const SettingsMenu = ({slippage, setSlippage}) => {
  return (
    <div className={styles.settingsMenu}>
      <SlippageSelection styles={styles} slippage={slippage} setSlippage={setSlippage} />

      <MoreSettings />
    </div>
  )
}

export default SettingsMenu
