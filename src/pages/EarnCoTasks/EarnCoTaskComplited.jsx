import { useEffect, useState } from 'react';
import { BottomMenuWithoutEnergy } from '../../components/BottomMenu/BM_wit_energy.jsx';
import { fetchEarnTasksData, fetchGetEarn } from '../../services/requests.js';

import { Loading } from '../../Loading.jsx';
import { CompanyTasks } from '../../components/CompanyComponents/CompanyTasks.jsx';
import { Title } from '../../components/common/Title.jsx';
import { URL } from '../../config/config.js';

const getImagePath = (app) => {
  switch (app.toLowerCase()) {
    case 'telegram':
      return '/telegram.png';
    case 'x':
      return '/x.png';
    case 'instagram':
      return '/instagram.png';
    default:
      return '/instagram.png';
  }
};

export function EarnCoTaskComplited() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [earn, setEarn] = useState(null);

  useEffect(() => {
    window.Telegram.WebApp.BackButton.hide();

    const getTasks = async () => {
      try {
        const result = await fetchEarnTasksData();
        result;
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    const getEarn = async () => {
      try {
        const result = await fetchGetEarn();
        setEarn(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getEarn();
    getTasks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="EarnCoTasks">
        <Title title={'Earn'} description={'earn more coins'} />
        {earn.map((item) => (
          <div key={item.id}>
            <CompanyTasks
              company_name={item.name}
              company_id={item.id}
              company_banner={`${URL}${item.banner}`}
              company_logo={`${URL}${item.logo}`}
              company_info={item.info}
              reward={item.reward}
              company_tasks={item.tasks}
              company_task_is_done={item.isDone}
            />
          </div>
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <BottomMenuWithoutEnergy />
    </>
  );
}
