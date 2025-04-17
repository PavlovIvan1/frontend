import { useLocation, useNavigate } from 'react-router';
import styles from './Company.module.scss';

export function CompanyTasks({
  company_name,
  company_id,
  company_banner,
  company_logo,
  company_info,
  company_tasks,
  reward,
  company_task_is_done,
}) {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  const info_company = {
    company_name: company_name,
    company_id: company_id,
    company_banner: company_banner,
    company_logo: company_logo,
    company_info: company_info,
    reward: reward,
    company_tasks: company_tasks,
    is_done: company_task_is_done,
  };

  const navigateToTasks = () => {
    navigate('/earn', { state: info_company });
  };

  return (
    <>
      <div className={styles.company} onClick={navigateToTasks}>
        <div className={styles.company__uppanel}>
          <div className={styles.company__name}>
            <img src={company_logo} alt="" />
            <span style={{ marginLeft: '5px' }}>{company_name}</span>
          </div>
          <span style={{ color: 'white', fontWeight: '600' }}>
            {' '}
            Earned: {reward} ozzo
          </span>
        </div>
        <div className={styles.company_infotext}>
          <p>{company_info}</p>
        </div>
      </div>
    </>
  );
}
