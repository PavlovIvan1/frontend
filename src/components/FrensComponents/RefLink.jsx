import { FaCopy } from 'react-icons/fa6';
import styles from './frens.module.scss';

import 'sweetalert2/src/sweetalert2.scss';
import { showSuccessToast } from '../../utils/toastUtils';

export function RefLink({
  referral_link,
  friend_reward,
  premium_friend_reward,
  daily_percentage,
}) {
  const copyToClipboard = () => {
    showSuccessToast('Copied!');
    navigator.clipboard.writeText(referral_link);
  };

  return (
    <>
      <div className={styles.title}>
        <p>Your referral link</p>
      </div>
      <div className={styles.Your_RefLink}>
        <span>{referral_link}</span>
        <FaCopy className={styles.copy} onClick={copyToClipboard} />
      </div>
      <div className={styles.title}>
        <h2 className={styles.ref_title}>Referral statistics</h2>
        <p>The number of friends invited and the total amount of rewards</p>
      </div>
      <div className={styles.Fr_link}>
        <div className={styles.Fr_reward}>
          <img
            src="/24.png"
            alt=""
            width={80}
            style={{ position: 'absolute', zIndex: '100' }}
          />
          <div className={styles.obj_text} style={{ marginLeft: '90px' }}>
            <h4>5000 coins</h4>
            <p>For an invited friend without telegram premium</p>
          </div>
        </div>
        <div className={styles.Fr_reward}>
          <img
            src="/2.png"
            alt=""
            width={80}
            style={{ position: 'absolute', zIndex: '100' }}
          />
          <div className={styles.obj_text} style={{ marginLeft: '90px' }}>
            <h4>10000 coins</h4>
            <p>For an invited friend with telegram premium</p>
          </div>
        </div>
        <div className={styles.Fr_reward}>
          <img
            src="/21.png"
            alt=""
            width={80}
            style={{ position: 'absolute', zIndex: '100' }}
          />
          <div className={styles.obj_text} style={{ marginLeft: '90px' }}>
            <h4>0.1%</h4>
            <p>Percentage of your referrals` earnings</p>
          </div>
        </div>
      </div>
    </>
  );
}
