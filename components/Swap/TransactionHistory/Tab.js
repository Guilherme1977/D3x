import { useState } from 'react'

const Tab = ({tab, styles}) => {
  const [expandable, setExpandable] = useState(false)

  return (
    <div className={styles.tab}>
      <div className={styles.top} 
        style={expandable ? {backgroundColor: '#268ffc', color: '#ffffff'} : {backgroundColor: '#ffffff', borderRadius: 'inherit'}} 
        onClick={() => setExpandable(!expandable)}>
        <p className={styles.title}><i class={tab.title === 'Swap' ? 'far fa-map-marked-alt' : 'far fa-shield-check'}></i> {tab.title}</p>
      
        <div className={styles.path}>
          <img src={tab.from.logoURI} alt={tab.from.logoURI} />
          <i className='far fa-chevron-right'></i>
          <img src={tab.to.logoURI} alt={tab.to.logoURI} />
        </div>
      </div>

      {expandable && 
        <div className={styles.expandable}>
          <div className={styles.path}>
            <i className={`far fa-level-up-alt ${styles.pathIcon}`}></i>
            <img src={tab.from.logoURI} alt={tab.from.logoURI} />
            <p>{tab.from.symbol}</p>
            <i className='far fa-chevron-right'></i>
            <img src={tab.to.logoURI} alt={tab.to.logoURI} />
            <p>{tab.to.symbol}</p>
          </div>

          <div className={styles.date}>
            <i className='far fa-clock'></i>
            <p>{new Date(tab.date).toDateString()}, {new Date(tab.date).toLocaleTimeString()}</p>
          </div>

          <div className={styles.hashString}>
            <i className='fas fa-barcode'></i>
            <p>{tab.hash.slice(0, 6)}...{tab.hash.slice(38, 42)}</p>
          </div>

          <div className={styles.hash}>
            <a href={`https://${tab.network == '0x38' ? 'bscscan.com' : 'etherscan.io'}/search?q=${tab.hash}`}>View on {tab.network == '0x38' ? 'BscScan' : 'EtherScan'}</a>
          </div>
        </div>
      }
    </div>
  )
}

export default Tab
