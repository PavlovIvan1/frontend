import { useEffect, useState } from 'react';
import {
  fetchActivateAutoBot,
  fetchClaimAutoBot,
  fetchGetPrice,
} from '../../services/requests';
import styles from './Boost.module.scss';

import 'sweetalert2/src/sweetalert2.scss';
import { showInfoToast, showSuccessToast } from '../../utils/toastUtils';

export function AutoBot() {
  const [isAutoBotBought, setIsAutoBotBought] = useState(() => {
    return JSON.parse(localStorage.getItem('isAutoBotBought')) || false;
  });

  const [priceData, setPriceData] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPrice = async () => {
      try {
        const result = await fetchGetPrice();
        result;

        for (const item of result) {
          if (item.ticker && item.ticker === 'autobot') {
            setPriceData(item.coins);
            return item;
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPrice();
  }, []);

  const buyAutoBot = async () => {
    try {
      const result = await fetchActivateAutoBot();
      result;
      showSuccessToast(result.data.success || 'Автобот куплен успешно');
      setIsAutoBotBought(true);
      localStorage.setItem('isAutoBotBought', true);
    } catch (err) {
      console.error(err);
    }
  };

  const autoBotClaim = async () => {
    try {
      const result = await fetchClaimAutoBot();
      result;
      if (result.success) {
        showSuccessToast(result.success || '');
      } else {
        showInfoToast(result.info || '');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <></>;
  }

  return (
    <>
      <div className={styles.title}>
        <h2 className={styles.title_h1}>Autobot</h2>
        <p>Earn and Claim coins in offline</p>
        <p>
          Autobot price:{' '}
          <span style={{ color: 'white', fontWeight: '700' }}>
            {priceData} coins
          </span>
        </p>
      </div>
      <button
        className="button-gradient"
        onClick={buyAutoBot}
        disabled={isAutoBotBought}
      >
        {isAutoBotBought ? 'Autobot already bought' : 'Buy autobot'}
      </button>
    </>
  );
}
