import { useEffect, useState } from 'react'
import { BottomMenuWithoutEnergy } from '../../components/BottomMenu/BM_wit_energy.jsx'
import { Obj } from '../../components/ObjComponents/Obj.jsx'
import { Title } from '../../components/common/Title.jsx'
import { fetchSocNetData, fetchStatData } from '../../services/requests.js'
import styles from '../frens/frens.module.scss'

import { Loading } from '../../Loading.jsx'

const getImagePath = (app) => {
  switch (app.toLowerCase()) {
    case 'telegram':
      return '/telegram.png';
    case 'x':
      return '/x.png';
    default:
      return '/instagram.png';
  }
};

export function Stats() {
  const [data, setData] = useState([]);
  const [dataTotal, setDataTotal] = useState();
  const [statData, setStatData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStatData = async () => {
      try {
        const result = await fetchStatData();
        setDataTotal(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStatData();

    const getSNData = async () => {
      try {
        const result = await fetchSocNetData();
        result;
        setStatData(result);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSNData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!statData) {
    return <></>;
  }

  return (
    <>
      <div className="Stats">
        <Title title={'All rewards'} description={'All rewards'} />
        <div className={styles.Fr_stat}>
          <div className={styles.Fr_rewards}>
            <span className={styles.big}>
              {dataTotal ? dataTotal.total_coins : 0}
            </span>
            <span className={styles.sm}>/ coins</span>
          </div>
        </div>
        <Title title={'Users'} description={'All users'} />
        <div className={styles.Fr_stat}>
          <div className={styles.Fr_rewards}>
            <span className={styles.big}>
              {dataTotal ? dataTotal.total_users : 0}
            </span>
            <span className={styles.sm}>/ users</span>
          </div>
        </div>
        <br />
        {data.length > 0 ? (
          data.map((item) => (
            <Obj
              key={item.id}
              img={getImagePath(item.app)}
              title={item.app}
              about={item.text}
              link={item.link}
            />
          ))
        ) : (
          <div>No data available</div>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <BottomMenuWithoutEnergy />
    </>
  );
}
