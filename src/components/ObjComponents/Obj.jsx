import { useNavigate } from 'react-router-dom'
import styles from './Obj.module.scss'

import { useState } from 'react'
import 'sweetalert2/src/sweetalert2.scss'
import {
  fetchBuySkin,
  fetchBuySkinStars,
  fetchSelectSkin,
  fetchTokenStatus,
} from '../../services/requests'
import { showErrorToast, showSuccessToast } from '../../utils/toastUtils'
import { BasicModal } from '../common/Modal'

let stylesObjWin = {
  border: 'solid 1px rgba(133, 255, 121, 0.65)',
};

let stylesObjFall = {
  border: 'solid 1px rgba(255, 90, 90, 0.65)',
};

const eventHandler = (e) => {
  console.log('e', e);
  console.log('e.status', e.status);
  console.log(e.target.value);
};

export function Obj({
  img,
  title,
  about,
  link,
  link_nav,
  data,
  win,
  buy,
  skinId,
  select,
  skinName,
}) {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);

  let borderStyles =
    win === true ? stylesObjWin : win === false ? stylesObjFall : null;

  const handleClick = () => {
    if (link) {
      window.Telegram.WebApp.openLink(link);
    } else if (link_nav) {
      navigate(link_nav, { state: data });
    }
  };

  const buySkin = async (id) => {
    try {
      const result = await fetchBuySkin(id);
      result;
      showSuccessToast('Скин куплен успешно!');
      navigate('/boost');
    } catch (err) {
      console.error(err);
    }
  };

  const SkinStarsStat = async (pt, id) => {
    try {
      const result = await fetchTokenStatus(pt, id);
      result;
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const buySkinForStars = async (id) => {
    id;
    try {
      const result = await fetchBuySkinStars(id);
      setPaymentData(result);
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

  const selectSkin = async (name) => {
    try {
      const result = await fetchSelectSkin(name);
      showSuccessToast('Скин выбран успешно!');
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
          if (SkinStarsStat(payload_token, skinId).is_paid == false) {
            showErrorToast('Fail!');
          } else {
            showSuccessToast('Оплачен');
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOption(null);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div
      className={styles.Obj_reward}
      onClick={handleClick}
      style={borderStyles}
    >
      <div className={styles.info_obj}>
        <img
          src={img}
          className={styles.obj}
          alt=""
          style={{ minWidth: '50px' }}
        />
        <div className={styles.obj_text}>
          <h4>{title}</h4>
          <p>{about}</p>
        </div>
      </div>
      {buy ? (
        <>
          <BasicModal
            text={'Buy'}
            textCoins={'Buy'}
            textStars={'Buy'}
            onClickCoins={() => {
              buySkin(skinId);
            }}
            onClickStars={() => {
              buySkinForStars(skinId);
            }}
          />
        </>
      ) : null}

      {select ? (
        <button
          onClick={() => {
            selectSkin(skinId);
          }}
          style={{
            color: 'black',
            border: 'none',
            borderRadius: '.75rem',
            fontWeight: '590',
            fontSize: '15px',
            width: '120px',
            minHeight: '40px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            letterSpacing: '1.5px',
          }}
          className="button-hover-s  button-gradient"
        >
          select
        </button>
      ) : null}
    </div>
  );
}
