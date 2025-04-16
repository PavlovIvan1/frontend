import { useEffect, useState } from 'react';
import { URL } from '../../config/config.js';
import { Loading } from '../../Loading.jsx';
import { fetchGetRefferals } from '../../services/requests.js';
import styles from './frens.module.scss';

export function Invites() {
  const [loading, setLoading] = useState(true);
  const [refferals, setRefferals] = useState([]);

  useEffect(() => {
    const getRefStat = async () => {
      try {
        const result = await fetchGetRefferals();
        setRefferals(result.referrals);
      } catch (err) {
        console.error('Error fetching referrals:', err);
        setRefferals([]);
      } finally {
        setLoading(false);
      }
    };

    getRefStat();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.title}>
        <h2 className={styles.ref_title}>Friends</h2>
        <p>The list of your referrals</p>
      </div>
      <div className={styles.Fr_link}>
        {refferals.length > 0 ? (
          refferals.map((referral, index) => (
            <div className={styles.Fr_reward} key={index}>
              <img
                src={`${URL}/media/${referral.photo}`}
                className={styles.person}
                alt={referral.tg_username}
                width={50}
              />
              <div className={styles.obj_text}>
                <h4>{referral.tg_username}</h4>
                <p>
                  {' '}
                  <span style={{ color: 'gold', fontWeight: '600' }}>
                    Referral balance:
                  </span>
                  {referral.coins}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No referrals yet.</p>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
