import { useEffect, useState } from 'react';
import { BottomMenuWithoutEnergy } from '../../components/BottomMenu/BM_wit_energy.jsx';
import { Invites } from '../../components/FrensComponents/Invites.jsx';
import { RefLink } from '../../components/FrensComponents/RefLink.jsx';
import { RefStat } from '../../components/FrensComponents/RefStat.jsx';
import { fetchGetRefferals } from '../../services/requests.js';
import styles from './frens.module.scss';

import { Loading } from '../../Loading.jsx';

export function Frens() {
  const [loading, setLoading] = useState(true);
  const [refData, setRefData] = useState(null);

  useEffect(() => {
    const getRefStat = async () => {
      try {
        const result = await fetchGetRefferals();
        setRefData(result);
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
      <div className={styles.Frens}>
        <RefStat
          total_earnings={refData.total_earnings}
          invited_count={refData.invited_count}
        />
        <RefLink
          referral_link={refData.referral_link}
          daily_percentage={refData.daily_percentage}
          premium_friend_reward={refData.premium_friend_reward}
          friend_reward={refData.friend_reward}
        />
        <Invites />
      </div>
      <BottomMenuWithoutEnergy />
    </>
  );
}
