import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { BottomMenuWithoutEnergy } from '../../components/BottomMenu/BM_wit_energy.jsx';
import { Title } from '../../components/common/Title.jsx';
import { ObjTask } from '../../components/ObjComponents/ObjTask.jsx';
import { Loading } from '../../Loading.jsx';
import { fetchGetEarn } from '../../services/requests.js';

const getImagePath = (app) => {
  switch (app.toLowerCase()) {
    case 'telegram':
      return '/telegram.png';
    case 'x':
      return '/x.png';
    default:
      return '/instagram.png';
  }
};

export function Earn() {
  const location = useLocation();
  const info_company = location.state;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const result = await fetchGetEarn();
      setTasks(result[0].tasks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCompletion = async () => {
    fetchTasks();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!loading ? (
        <>
          <div className="Earn">
            <Title
              title={info_company.company_name}
              description={info_company.company_info}
            />
            <div className="company_tasks">
              {tasks.filter((item) => !item.isDone).length > 0 ? (
                tasks
                  .filter((item) => !item.isDone)
                  .map((item, index) => (
                    <ObjTask
                      title={item.name}
                      key={index}
                      img={getImagePath(item.name_social)}
                      link={item.link}
                      done={item.isDone}
                      task_id={item.id.toString()}
                      onComplete={handleTaskCompletion}
                    />
                  ))
              ) : (
                <div>No tasks available</div>
              )}
            </div>
          </div>
          <BottomMenuWithoutEnergy />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
