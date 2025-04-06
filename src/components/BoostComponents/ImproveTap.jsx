import React, { useEffect, useState } from 'react';
import { Loading } from '../../Loading.jsx';
import {
  fetchBaseUserData,
  fetchCheckTapStars,
  fetchGetPrice,
  fetchUpdateTap,
  fetchUpdateTapStars,
} from '../../services/requests.js';
import styles from './boost.module.scss';

import 'sweetalert2/src/sweetalert2.scss';
import { showSuccessToast } from '../../utils/toastUtils.js';
import { BasicModal } from '../common/Modal.jsx';

export function ImproveTap({ setTapPrice }) {
  const [userBase, setUserBase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedTapLevel, setUpdatedTapLevel] = useState(1);
  const [priceData, setPriceData] = useState(0);

  const getTapStars = async (value) => {
    try {
      const result = await fetchUpdateTapStars(value);
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

  const checkTapStars = async (value, pt) => {
    try {
      const result = await fetchCheckTapStars(value, pt);
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
          if (checkTapStars(1, payload_token).is_paid == false) {
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
        if (item.ticker && item.ticker === 'update_tap') {
          setPriceData(item.coins);
          setTapPrice(item.coins);
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
    const getUserBase = async () => {
      try {
        const result = await fetchBaseUserData();
        result;
        setUserBase(result);
        setUpdatedTapLevel(result.taplevel);
      } catch (err) {
        console.error(err);
      }
    };

    getUserBase();
    getPrice();
  }, []);

  const fetchUpdTap = async (tap) => {
    try {
      const result = await fetchUpdateTap(tap);
      result;
      showSuccessToast(result.message || 'Successful');
      setUpdatedTapLevel((prev) => (prev += 1));
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
        <h2 className={styles.title_h1}>Tap level</h2>
      </div>
      <div className={styles.tap_lvl}>
        <h1 className="big">{updatedTapLevel}</h1>
        <span>Your tap level</span>
      </div>
      <BasicModal
        text={'Buy'}
        textCoins={`Buy for ${priceData} `}
        textStars={'Buy'}
        onClickCoins={() => {
          getPrice();
          fetchUpdTap(1);
        }}
        onClickStars={() => getTapStars(1)}
      />
    </div>
  );
}
