import styles from '../pages/Frens/frens.module.scss'
import repsty from './reapblocks.module.css'

export function VoteTasks({ title }) {
  return (
    <>
      <div className={styles.title}>
        <h2 className={styles.ref_title}>{title}</h2>
      </div>
      <img src="/16.png" alt="" className={styles.tc} />
      <div className={repsty.company}>
        <div>
          <img src="/28850.png" alt="" />
          <span>Notcoin</span>
        </div>
        <div>
          <span>Rewards: 22 points</span>
        </div>
      </div>
      <div className={repsty.company_desc}>
        <p className={repsty.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </>
  );
}
