import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { BottomMenuWithoutEnergy } from '../../components/BottomMenu/BM_wit_energy.jsx'
import { Title } from '../../components/common/Title.jsx'
import { ObjInvites } from '../../components/ObjComponents/ObjInvites.jsx'
import { ObjTask } from '../../components/ObjComponents/ObjTask.jsx'
import { Loading } from '../../Loading.jsx'

const getImagePath = (app) => {
  switch (app.toLowerCase()) {
    case 'telegram':
      return '/telegram.png';
    case 'x':
      return '/x.png';
    case 'invite':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-round-icon lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
    default:
      return '/instagram.png';
  }
};

export function Earn() {
  const location = useLocation();
  const info_company = location.state; // Используем переданные данные
  const [tasks, setTasks] = useState(info_company.company_tasks || []); // Инициализируем состояние задач
  const [loading, setLoading] = useState(false); // Можно установить значение false сразу, если нет первоначальной загрузки

  useEffect(() => {
    // Если нужно, можно здесь выполнить дополнительную проверку
    setLoading(false); // Устанавливаем загрузку в false, если уже есть данные
  }, [info_company]);

  const handleTaskCompletion = async () => {
    // Обновите задачи по необходимости, например, если задача была выполнена
    setTasks((prevTasks) => prevTasks.filter((task) => !task.isDone)); // Обновите состояние, если нужно
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="Earn">
        <Title
          title={info_company.company_name}
          description={info_company.company_info}
        />

        <img
          src={info_company.company_banner}
          alt=""
          style={{
            width: '100%',
            borderRadius: '20px',
            height: '200px',
            objectFit: 'cover',
          }}
        />

        <div className="company_tasks">
          {tasks.filter((item) => !item.isDone).length > 0 ? (
            tasks
              .filter((item) => !item.isDone)
              .map((item, index) =>
                getImagePath(item.name_social) === 'Invite' ? (
                  <ObjInvites
                    title={item.name}
                    key={index}
                    img={getImagePath(item.name_social)}
                    done={item.isDone}
                    task_id={item.id.toString()}
                    onComplete={handleTaskCompletion}
                  />
                ) : (
                  <ObjTask
                    title={item.name}
                    key={index}
                    img={getImagePath(item.name_social)}
                    link={item.link}
                    done={item.isDone}
                    task_id={item.id.toString()}
                    onComplete={handleTaskCompletion}
                    isTelegram={item.name_social.toLowerCase() === 'telegram'}
                  />
                )
              )
          ) : (
            <div>No tasks available</div>
          )}
        </div>
      </div>
      <BottomMenuWithoutEnergy />
    </>
  );
}
