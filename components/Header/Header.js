import styles from './Header.module.scss'

const Header = ({connect, user, ethereumAvailability, menu, setMenu}) => {
  const loadURL = (url) => window.open(url, '_self')

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo} onClick={() => loadURL('/')}>
          <img src={`/images/logos/logo.png?${Date.now()}`} />
        </div>

        <div className={styles.app}>
          <p>DEX Aggregator</p>
        </div>
      </div>
      
      <div className={styles.right}>
        {ethereumAvailability ?
          <div className={styles.wallet}>
            <p>{user.address.slice(0, 6)}...{user.address.slice(38, 42)}</p>
          </div>
        :
          <div className={`${styles.connect} ${styles.btn}`}>
            <p onClick={() => connect()}>Connect MetaMask</p>
          </div>
        }

        <div className={`${styles.btn} ${styles.bar}`} onClick={() => setMenu(!menu)}>
          <i className='fal fa-bars'></i>
        </div>
      </div>
    </header>
  )
}

export default Header