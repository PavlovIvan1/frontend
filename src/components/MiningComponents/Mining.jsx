import { useEffect, useRef, useState } from 'react'
import {
  fetchBaseUserData,
  fetchUserAddCoins,
} from '../../services/requests.js'
import { useStore } from '../../store/useStore.js'
import styles from './Mining.module.scss'

import 'sweetalert2/src/sweetalert2.scss'
import { URL } from '../../config/config.js'
import { Loading } from '../../Loading.jsx'
import { showInfoToast } from '../../utils/toastUtils.js'

export function Mining({ setIsClick }) {
  const [points, setPoints] = useState(0);
  const [taps, setTaps] = useState([]);
  const [baseUser, setBaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const curEnergy = useStore((state) => state.cur_energy);

  const [skin, setSkin] = useState(null);
  const [skin2, setSkin2] = useState(null);

  const increaseScore = useStore((state) => state.increaseScore);
  const amount = useStore((state) => state.amount);

  const lastTapTimes = useRef({});

  const handleClick = (clientX, clientY, touchId) => {
    const now = Date.now();
    const lastTapTime = lastTapTimes.current[touchId] || 0;
    const timeSinceLastTap = now - lastTapTime;

    if (timeSinceLastTap < 100) {
      return;
    }

    lastTapTimes.current[touchId] = now;

    if (curEnergy >= amount) {
      setIsClick(true);
      setPoints((prev) => prev + amount);
      increaseScore();

      const newTap = {
        id: Math.random().toString(36).substr(2, 9),
        top: `${clientY - 300}px`,
        left: `${clientX + 10}px`,
        amount,
      };
      setTaps((prev) => [...prev, newTap]);

      const addCoinsToB = async () => {
        try {
          await fetchUserAddCoins(amount);
        } catch (err) {
          console.error(err);
        }
      };

      addCoinsToB();

      setTimeout(() => {
        setTaps((prev) => prev.filter((tap) => tap.id !== newTap.id));
      }, 1000);
    } else {
      showInfoToast('Недостаточно энергии');
    }
  };

  const handleTouchStart = (ev) => {
    ev.preventDefault();
    Array.from(ev.touches).forEach((touch) => {
      handleClick(touch.clientX, touch.clientY, touch.identifier);
    });
  };

  useEffect(() => {
    const getBaseUserData = async () => {
      try {
        const result = await fetchBaseUserData();
        setBaseUser(result);
        setSkin(`${URL}${result.skin.skin}`);
        setSkin2(`${URL}${result.skin.skin2}`);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getBaseUserData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.mining}>
        <div
          className={styles.blackHole}
          onTouchStart={handleTouchStart}
          style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            height: '375px',
          }}
        >
          <img
            src={skin}
            alt="Черная дыра"
            style={{ position: 'absolute', zIndex: '100' }}
            className={styles.blackhole_center}
          />
          <img
            src={skin2}
            alt="Черная дыра горизонт"
            style={{ position: 'relative' }}
            className={styles.blackhole_border}
          />
        </div>

        {taps.map((tap) => (
          <div
            key={tap.id}
            className={styles.score}
            style={{
              top: tap.top,
              left: tap.left,
              zIndex: 10000,
              position: 'absolute',
            }}
          >
            +{Math.floor(tap.amount)}
          </div>
        ))}
      </div>
    </>
  );
}