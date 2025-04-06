import { useEffect, useState } from 'react';
import { URL } from '../../config/config.js';
import { fetchSkinsNotOnSaleData } from '../../services/requests.js';
import { Title } from '../common/Title.jsx';
import { Obj } from '../ObjComponents/Obj.jsx';

export function SkinsPur({ title, description }) {
  const [skins, setSkins] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSkinsNotOnSale = async () => {
      try {
        const result = await fetchSkinsNotOnSaleData();
        setSkins(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSkinsNotOnSale();
  }, []);

  if (loading) {
    return <loading />;
  }

  return (
    <>
      {/* <div className={styles.title}>
        <h2 className={styles.ref_title}>{title}</h2>
        <p>{description}</p>
      </div> */}

      <Title title={title} description={description} />

      {skins.map((item) => (
        <Obj
          key={item.id}
          img={`${URL}${item.skin2}`}
          title={`Tap level - ${item.tap}`}
          select={true}
          skinId={item.id}
        />
      ))}
    </>
  );
}
