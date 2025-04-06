import { useEffect, useState } from 'react';
import { URL } from '../../config/config.js';
import { Loading } from '../../Loading.jsx';
import { fetchSkinsOnSaleData } from '../../services/requests.js';
import { Title } from '../common/Title.jsx';
import { Obj } from '../ObjComponents/Obj.jsx';

export function Skins({ title, description }) {
  const [loading, setLoading] = useState(true);
  const [skins, setSkins] = useState(null);

  useEffect(() => {
    const getSkinsOnSale = async () => {
      try {
        const result = await fetchSkinsOnSaleData();
        setSkins(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSkinsOnSale();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* <div className={styles.title}>
        <h2 className={styles.ref_title}>{title}</h2>
        <p>{description}</p>
      </div> */}

      <Title title={title} description={description} />

      {skins.length > 0 ? (
        skins.map((item) => (
          <Obj
            key={item.id}
            img={`${URL}${item.skin2}`}
            title={`Tap level - ${item.tap}`}
            buy={true}
            skinId={item.id}
          />
        ))
      ) : (
        <p>No skins available</p>
      )}
    </>
  );
}
