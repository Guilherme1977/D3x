import styles from './Header.module.scss'
import { useState } from 'react'
import Avatar from '../Misc/Avatar'

const Header = ({ethereumAvailability, menu, setMenu, user}) => {
  const [dropdown, setDropdown] = useState(false)

  const loadURL = (url) => window.open(url, '_self')
  const copyURL = () => navigator.clipboard.writeText(`https://nft.belari.finance/profile/${user.address}`)

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.brand} onClick={() => loadURL('/')}>
          <img src={'/images/logos/logo.png?'+ new Date().getTime()} alt='' />
          <p className={styles.logo}>Belair <span>NFTs</span></p>
        </div>
      </div>
      
      <div className={styles.right}>
        <div className={styles.btn} onClick={() => loadURL('/create/erc721')}>
          <p>Create</p>
        </div>

        {user &&
          <div className={styles.pfp}>
            <div className={styles.imgContainer} onClick={() => setDropdown(!dropdown)}>
              {user.profileImage ?
                <div className={styles.img} style={{backgroundImage: `url(${user.profileImage})`}} />
                :
                <div className={styles.img}><Avatar seed={user.address} /></div>
              }
            </div>

            {dropdown &&
              <div className={styles.dropdown}>
                <p onClick={copyURL}><i className='fal fa-clone'></i> {user.address.slice(0, 6)}...{user.address.slice(38, 42)}</p>  
                <p onClick={() => loadURL(`/profile/${user.address}`)}><i className='fal fa-user'></i> Profile</p>  
              </div>}
          </div>
        }

        {!ethereumAvailability &&
          <div className={`${styles.connect} ${styles.btn}`}>
            <p onClick={() => loadURL('https://metamask.io/')}>Download MetaMask</p>
          </div>}

        <div className={`${styles.btn} ${styles.bar}`} onClick={() => setMenu(!menu)}>
          <i className='far fa-bars'></i>
        </div>
      </div>
    </header>
  )
}

export default Header