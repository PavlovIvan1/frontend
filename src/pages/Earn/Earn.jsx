// import { useEffect, useState } from 'react'
// import { useLocation } from 'react-router'
// import { BottomMenuWithoutEnergy } from '../../components/BottomMenu/BM_wit_energy.jsx'
// import { Title } from '../../components/common/Title.jsx'
// import { ObjTask } from '../../components/ObjComponents/ObjTask.jsx'
// import { Loading } from '../../Loading.jsx'
// import { fetchGetEarn } from '../../services/requests.js'

// const getImagePath = (app) => {
//   switch (app.toLowerCase()) {
//     case 'telegram':
//       return '/telegram.png';
//     case 'x':
//       return '/x.png';
//     default:
//       return '/instagram.png';
//   }
// };

// export function Earn() {
//   const location = useLocation();
//   const info_company = location.state;
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     try {
//       const result = await fetchGetEarn();
//       setTasks(result[0].tasks || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const fetchTasks = async () => {
//   //   const result = await fetchGetEarn();
//   //   const selectedCompanyTasks = result.find(company => company.id_comp === info_company.company_id);
  
//   //   if (selectedCompanyTasks) {
//   //     setTasks(selectedCompanyTasks.tasks || []);
//   //   }
//   // };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleTaskCompletion = async () => {
//     fetchTasks();
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <>
//       {!loading ? (
//         <>
//           <div className="Earn">
//             <Title
//               title={info_company.company_name}
//               description={info_company.company_info}
//             />
//             <div className="company_tasks">
//               {tasks.filter((item) => !item.isDone).length > 0 ? (
//                 tasks
//                   .filter((item) => !item.isDone)
//                   .map((item, index) => (
//                     <ObjTask
//                       title={item.name}
//                       key={index}
//                       img={getImagePath(item.name_social)}
//                       link={item.link}
//                       done={item.isDone}
//                       task_id={item.id.toString()}
//                       onComplete={handleTaskCompletion}
//                     />
//                   ))
//               ) : (
//                 <div>No tasks available</div>
//               )}
//             </div>
//           </div>
//           <BottomMenuWithoutEnergy />
//         </>
//       ) : (
//         <Loading />
//       )}
//     </>
//   );
// }


import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { BottomMenuWithoutEnergy } from '../../components/BottomMenu/BM_wit_energy.jsx'
import { Title } from '../../components/common/Title.jsx'
import { ObjTask } from '../../components/ObjComponents/ObjTask.jsx'
import { Loading } from '../../Loading.jsx'

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
  const info_company = location.state;  // Используем переданные данные
  const [tasks, setTasks] = useState(info_company.company_tasks || []); // Инициализируем состояние задач
  const [loading, setLoading] = useState(false); // Можно установить значение false сразу, если нет первоначальной загрузки

  useEffect(() => {
    // Если нужно, можно здесь выполнить дополнительную проверку
    setLoading(false); // Устанавливаем загрузку в false, если уже есть данные
  }, [info_company]);

  const handleTaskCompletion = async () => {
    // Обновите задачи по необходимости, например, если задача была выполнена
    setTasks((prevTasks) => prevTasks.filter(task => !task.isDone)); // Обновите состояние, если нужно
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
          src={company_banner}
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
              .map((item, index) => (
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
              ))
          ) : (
            <div>No tasks available</div>
          )}
        </div>
      </div>
      <BottomMenuWithoutEnergy />
    </>
  );
}

