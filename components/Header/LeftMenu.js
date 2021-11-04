import { useEffect, useState } from 'react'
import styles from './LeftMenu.module.scss'

const LeftMenu = ({menu, network, ethereumAvailability}) => {
  const [expand, setExpand] = useState(false)
  const loadURL = (url) => window.open(url, '_self')

  useEffect(() => {
    setExpand(window.innerWidth < 650 ? true : false)
  }, [])

  return (
    <div className={`${styles.leftMenu} ${expand && styles.expanded}`} style={{display: menu ? 'flex' : 'none'}}>
      <div className={styles.menu}>
        <ul>
          <li onClick={() => setExpand(!expand)}><i className={!expand ? 'far fa-bars' : 'far fa-times'}></i></li>
          <li onClick={() => loadURL('https://www.belair.finance')}><i className='fad fa-th-large'></i> Home</li>
          <li className={styles.selected} onClick={() => loadURL('https://swap.belair.finance')}><i className='fad fa-route'></i> Swap</li>
          <li onClick={() => loadURL('/')}><i className='fad fa-store'></i> NFT Marketplace</li>
        </ul>
      </div>

      {!ethereumAvailability && 
        <div className={styles.metamask} onClick={() => loadURL('https://metamask.io/')}>
          <p>Download MetaMask</p>
        </div>}

      {expand ?
        <div className={styles.bottom}>
          <ul className={styles.social}>
            <li onClick={() => loadURL('https://twitter.com/wastebridge')}><i className='fab fa-twitter'></i></li>
            <li onClick={() => loadURL('https://www.facebook.com/wastebridge')}><i className='fab fa-facebook-f'></i></li>
            <li onClick={() => loadURL('https://t.me/wastebridge')}><i className='fab fa-telegram-plane'></i></li>
          </ul>
        
          <ul className={styles.net}>
            <li className={styles.network} style={{color: network.theme}}>
              {network.name ? network.name : 'Unknown Network'}
            </li>
          </ul>
        </div>
      :
        <></>
      }
    </div>
  )
}

export default LeftMenu
