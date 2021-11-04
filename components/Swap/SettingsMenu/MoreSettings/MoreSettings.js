import { useState } from 'react'
import styles from './MoreSettings.module.scss'

const MoreSettings = () => {
  const [nonce, setNonce] = useState()
  const [gas, setGas] = useState(300000)

  return (
    <div className={styles.moreSettings}>
      <p className={styles.infoHeader}><i className='far fa-sliders-v'></i> More Settings</p>

      <div className={styles.section}>
        <p className={styles.type}><i className='fad fa-fingerprint'></i>Nonce:</p>
        <input type='number' placeholder='0' value={nonce} onChange={e => setNonce(e.target.value)} />
      </div>

      <div className={styles.section}>
        <p className={styles.type}><i className='fad fa-gas-pump'></i> Gas:</p>
        <input type='number' value={gas} onChange={e => setGas(e.target.value)} />
      </div>

      <p className={styles.subInfoHeader}>If transaction fails, adjust Gas. Recommended Gas is 300,000.</p>
      {/* If left blank, default values will be used for transactions.  */}
    </div>
  )
}

export default MoreSettings
