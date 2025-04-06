import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import 'sweetalert2/src/sweetalert2.scss';
import { BasicModal } from '../../components/common/Modal.jsx';
import { API_URL } from '../../config/config.js';
import {
  fetchBoost2Data,
  fetchBoostData,
  fetchCheckforStars,
  fetchGetPrice,
  fetchLeaveSquad,
} from '../../services/requests.js';
import { showErrorToast, showSuccessToast } from '../../utils/toastUtils.js';
import styles from '../Saquads/Squads.module.scss';

export function Pay() {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const get_payment = async () => {
      try {
        const result = await fetchBoost2Data();
        setPaymentData(result);
      } catch (err) {
        console.error(err);
      }
    };

    get_payment();
  }, []);

  const initiatePayment = () => {
    if (paymentData.readyToPay) {
      window.Telegram.WebApp.openInvoice(paymentData.paymentLink);
    } else {
      showErrorToast('Оплата недоступна в данный момент');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Услуга: Буст Сквада</h1>
      <p>Описание: Продвижение сквада в топ на 24 часа</p>
      <p>Стоимость: 100 Telegram Stars</p>
      <button
        onClick={initiatePayment}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#0088cc',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Оплатить
      </button>
    </div>
  );
}

export function SquadOpen() {
  const location = useLocation();
  const data = location.state;
  const [priceData, setPriceData] = useState([]);

  const [paymentData, setPaymentData] = useState(null);

  const navigate = useNavigate();

  const joinSquad = async () => {
    const url = `${API_URL}/users/join_to_squad/?data=${data.id}`;

    const headers = {
      'Content-Type': 'application/json',
      initData: window.Telegram.WebApp.initData,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      navigate('/squads');
    }
  };

  const checkForStars = async (pt) => {
    try {
      const data = await fetchCheckforStars(pt, data.channelname);
      return data;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const boostSquad = async () => {
    try {
      const result = await fetchBoostData(data.channelname);
      showSuccessToast('Successful');
      setTimeout(() => {
        navigate('/');
      }, 3010);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getPrice = async () => {
      try {
        const result = await fetchGetPrice();
        result;

        for (const item of result) {
          if (item.ticker && item.ticker === 'boost_squad') {
            setPriceData(item);
            return item;
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    const get_payment = async () => {
      try {
        const result = await fetchBoost2Data(data.channelname);
        setPaymentData(result);
      } catch (err) {
        console.error(err);
      }
    };

    get_payment();
    getPrice();

    const callback = () => {
      navigate('/squads');
    };

    window.Telegram.WebApp.BackButton.show();
    Telegram.WebApp.onEvent('backButtonClicked', callback);
  }, []);

  const initiatePayment = () => {
    if (paymentData) {
      paymentData;
      if (paymentData.ready_to_pay) {
        window.Telegram.WebApp.openInvoice(paymentData.payment_link);

        if (checkForStars(paymentData.payload_token).is_paid) {
          showSuccessToast('Paid is successful');
          setTimeout(() => {
            navigate('/');
          }, 3010);
        } else {
          setTimeout(() => {
            if (checkForStars(paymentData.payload_token).is_paid) {
              showSuccessToast('Paid is successful');

              setTimeout(() => {
                navigate('/');
              }, 3010);
            }

            initiatePayment();
          }, 1000);
        }
      } else {
        showErrorToast('Оплата недоступна в данный момент');
      }
    }
  };

  const leave_squad = async () => {
    try {
      const result = await fetchLeaveSquad(data.channelname);
      showSuccessToast('Success');
      navigate('/squads');
    } catch (err) {
      console.error(err);
    }
  };

  const linkTOpen = () => {
    window.Telegram.WebApp.openTelegramLink(`https://t.me/${data.channelname}`);
  };

  return (
    <>
      <div className="squadOpenMenu" style={{ marginTop: '60px' }}>
        <div style={{ display: 'flex' }}>
          <img src={data.photo} alt="squad photo" />
          <h3>{data.name}</h3>
        </div>
        <img
          src="/leave_squad.svg"
          alt="leave"
          className="leave_squad"
          onClick={leave_squad}
        />
      </div>
      <div className="SquadOpen">
        <div>
          <img src={data.photo} alt="" className="person" />
          <h3>{data.name}</h3>
          <span>{data.members_count} joiners</span>
          <br />
          <span>{data.position} position</span>
          <br />
          <span
            style={{ color: 'var(--tg-theme-link-color)', fontSize: '15px' }}
            onClick={linkTOpen}
          >
            https://t.me/{data.channelname}
          </span>
        </div>
        <br />

        <BasicModal
          text={'Boost'}
          onClickStars={initiatePayment}
          onClickCoins={boostSquad}
          textStars={'Boost'}
          textCoins={'Boost'}
          priceCoins={priceData.coins}
          priceStars={priceData.stars}
          width={{ width: '100%' }}
        />
        <button className={styles.button_gradient} onClick={joinSquad}>
          Join
        </button>
      </div>
    </>
  );
}
