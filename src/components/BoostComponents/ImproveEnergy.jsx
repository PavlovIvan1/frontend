import React, { useEffect, useState } from 'react'
import { Loading } from '../../Loading.jsx'
import {
  fetchCheckEnergyStars,
  fetchGetPrice,
  fetchImproveEnergy,
  fetchUpdateEnergyStars,
  fetychGetTaP,
} from '../../services/requests.js'
import styles from './boost.module.scss'

import 'sweetalert2/src/sweetalert2.scss'
import { showSuccessToast } from '../../utils/toastUtils.js'
import { BasicModal } from '../common/Modal.jsx'

export function ImproveEnergy({ setEnergyPrice }) {
  const [loading, setLoading] = useState(true);
  const [updatedTapLevel, setUpdatedTapLevel] = useState(100);
  const [priceData, setPriceData] = useState(0);
  const [isImprove, setIsImprove] = useState(false);

  const getEnStars = async (value) => {
    try {
      const result = await fetchUpdateEnergyStars(value);
      initiatePayment(
        result.payment_link,
        result.ready_to_pay,
        result,
        result.payload_token
      );
    } catch (err) {
      console.error(err);
    }
  };

  const checkEnStars = async (value, pt) => {
    try {
      const result = await fetchCheckEnergyStars(value, pt);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const initiatePayment = async (
    pay_link,
    ready_to_pay,
    result,
    payload_token
  ) => {
    console.log('result, ready_to_pay', result, ready_to_pay);
    if (result) {
      if (ready_to_pay) {
        window.Telegram.WebApp.openInvoice(pay_link);

        setTimeout(() => {
          if (checkEnStars(100, payload_token).is_paid == false) {
            showErrorToast('Fail!');
          } else {
            showSuccessToast('Оплачен');
            getPrice();
            setTimeout(() => {
              navigate('/');
            }, 1010);
          }
        }, 10000);
      } else {
        showErrorToast('Оплата не прошла');
      }
    } else {
      console.log('result is undefined');
    }
  };

  const getPrice = async () => {
    try {
      const result = await fetchGetPrice();
      result;

      for (const item of result) {
        if (item.ticker && item.ticker === 'update_energy') {
          setPriceData(item.coins_per_energy * 100);
          setEnergyPrice(item.coins_per_energy * 100);
          return item;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getTapFromB = async () => {
      try {
        const result = await fetychGetTaP();
        setUpdatedTapLevel(result.max_energy);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTapFromB();
    getPrice();
  }, []);

  const fetchUpdEn = async (energy) => {
    try {
      const result = await fetchImproveEnergy(energy);
      result;
      showSuccessToast(result.message || 'Successful');
      setUpdatedTapLevel((prev) => (prev += 100));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.level_box}>
      <div className={styles.title}>
        <h2 className={styles.title_h1}>Energy level</h2>
      </div>
      <div className={styles.tap_lvl}>
        <h1 className="big">{updatedTapLevel}</h1>
        <span>Your energy level</span>
      </div>
      <BasicModal
        text={'Buy'}
        textCoins={`Buy for ${priceData} `}
        textStars={'Buy'}
        onClickCoins={() => {
          getPrice();
          fetchUpdEn(100);
        }}
        onClickStars={() => getEnStars(100)}
      />
    </div>
  );
}
