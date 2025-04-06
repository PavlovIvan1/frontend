import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Obj } from '../../components/ObjComponents/Obj.jsx';
import { Title } from '../../components/common/Title.jsx';
import { fetchGetSquads } from '../../services/requests.js';
import styles from './Squads.module.scss';

export function Squads() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSquads = async () => {
      try {
        const result = await fetchGetSquads();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    getSquads();

    const callback = () => {
      navigate('/');
    };

    window.Telegram.WebApp.BackButton.show();
    Telegram.WebApp.onEvent('backButtonClicked', callback);
  }, []);

  return (
    <>
      <div className="Squads">
        <Title title={'Squads'} />

        {data.length > 0 ? (
          data.map((item) => (
            <Obj
              key={item.id}
              img={item.photo || 'https://via.placeholder.com/150'}
              title={item.name}
              link_nav={'/squadopen'}
              data={item}
              {...(item.boosted ? { win: item.boosted } : {})}
            />
          ))
        ) : (
          <p>No squads available</p>
        )}
        <br />
        <br />
        <br />
        <button
          className={styles.button_gradient}
          onClick={() => navigate('/createsquad')}
          style={{ width: '92%' }}
        >
          Create your squad
        </button>
      </div>
    </>
  );
}
