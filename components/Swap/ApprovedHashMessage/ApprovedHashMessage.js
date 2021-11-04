import styles from './ApprovedHashMessage.module.scss'

const ApprovedHashMessage = ({approvedHash, setApprovedHash, network}) => {
  return (
    <div className={styles.approvedHashMessage}>
      <i className={`fad fa-lightbulb-exclamation ${styles.bulb}`}></i>
      <p>Transaction <a href={`https://${network === 1 ? 'etherscan.io' : 'bscscan.com'}/search?q=${approvedHash}`} target='_blank'>{approvedHash}</a> was mined.</p>
      <i className={`far fa-times ${styles.close}`} onClick={() => setApprovedHash(null)}></i>
    </div>
  )
}

export default ApprovedHashMessage
