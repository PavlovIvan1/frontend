import { useEffect, useState } from 'react';
import { Loading } from '../../Loading';
import { fetchGetRefferals } from '../../services/requests';
import styles from './Boost.module.scss';

export function Boost_comp() {
  const [loading, setLoading] = useState(true);
  const [refData, setRefData] = useState(null);

  useEffect(() => {
    const getRefStat = async () => {
      try {
        const result = await fetchGetRefferals();
        setRefData(result)(result.referrals.length);
      } catch (err) {
        console.error(err);
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
        <h2 className={styles.title_h1}>Friends</h2>
        <p>The list of your referrals</p>
      </div>
      <div className={styles.tap_lvl}>
        <h1 className="big">{refData.referrals.length}</h1>
        <span>Your referrals</span>
      </div>
    </>
  );
}
