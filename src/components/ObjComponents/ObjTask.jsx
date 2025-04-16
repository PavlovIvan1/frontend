import { useNavigate } from 'react-router-dom';
import styles from './Obj.module.scss';

import 'sweetalert2/src/sweetalert2.scss';
import { fetchMarkAsDone } from '../../services/requests';
import { showSuccessToast } from '../../utils/toastUtils';

export function ObjTask({
  img,
  title,
  about,
  link,
  link_nav,
  data,
  done,
  task_id,
  onComplete,
  isTelegram
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      if (isTelegram) {
        window.Telegram.WebApp.openTelegramLink(link);
      } else {
        window.Telegram.WebApp.openLink(link);
      }
    } else if (link_nav) {
      navigate(link_nav, { state: data });
    }
  };

  const handleClaimClick = async () => {
    try {
      const result = await fetchMarkAsDone(task_id);
      onComplete();
      showSuccessToast(result.detail);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={styles.Fr_reward}
      onClick={handleClick}
      style={done ? {} : { border: 'solid 1px rgba(0, 0, 0, 0.65)' }}
    >
      <div className={styles.info_obj}>
        <img
          src={img}
          className={styles.person}
          alt=""
          style={{ minWidth: '50px' }}
        />
        <div className={styles.obj_text}>
          <h4>{title}</h4>
          <p>{about}</p>
        </div>
      </div>
      <button
        onClick={handleClaimClick}
        className="button-gradient"
        style={{
          width: '85px',
          height: '30px',
          borderRadius: '10px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Check
      </button>
    </div>
  );
}
