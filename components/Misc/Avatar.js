import styles from './Avatar.module.scss'

const Avatar = ({seed}) => {
  return <img src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg?mood[]=happy`} alt={seed} className={styles.avatar} />
}

export default Avatar
