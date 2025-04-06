import styles from './frens.module.scss'

export function RefStat({ invited_count, total_earnings }) {
  return (
    <>
      <div className={styles.title}>
        <h2 className={styles.ref_title}>Referral statistics</h2>
        <p>The number of friends invited and the total amount of rewards</p>
      </div>
      <div className={styles.Fr_stat}>
        <div className={styles.Fr_friends}>
          <span className={styles.big}>
            {invited_count}
          </span>
          <span className={styles.sm}>/ friends</span>
        </div>
        <div className={styles.Fr_rewards}>
          <span className={styles.big}>
            {total_earnings}
          </span>
          <span className={styles.sm}>/ rewards</span>{' '}
        </div>
      </div>
    </>
  );
}
