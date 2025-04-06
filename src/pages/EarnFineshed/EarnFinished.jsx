import { useEffect, useState } from 'react';
import { BottomMenuWithoutEnergy } from '../../components/BottomMenu/BM_wit_energy';
import { Obj } from '../../components/ObjComponents/Obj';
import { Loading } from '../../Loading';
import { fetchGetSurveyData } from '../../services/requests';
import styles from './eaw.module.scss';

export function EarnVoFin() {
  const [loading, setLoading] = useState(true);
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchGetSurveyData();
        'Survey', result;
        setSurveyData(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!surveyData) {
    return <div>Error loading survey data</div>;
  }

  const { survey, percentages, user_answer, user_is_correct } = surveyData;

  const answers = [
    {
      title: survey.answer1,
      about: `${percentages.answer1}%`,
      img: survey.photo1,
      win: survey.is1correct,
    },
    {
      title: survey.answer2,
      about: `${percentages.answer2}%`,
      img: survey.photo2,
      win: survey.is2correct,
    },
    {
      title: survey.answer3,
      about: `${percentages.answer3}%`,
      img: survey.photo3,
      win: survey.is3correct,
    },
  ];
  const style = {
    width: '200px',
    height: '250px',
    backgroundColor: '#222223',
    borderRadius: '20px',
    boxShadow: '0 0 50px #342868d1',
    marginBottom: '40px',
    boxSizing: 'border-box',
    border: user_is_correct
      ? 'solid 1px rgba(133, 255, 121, 0.65)'
      : 'solid 1px rgba(255, 90, 90, 0.65)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  return (
    <>
      <div className="EaenVoFin">
        <div className={styles.res}>
          {user_is_correct ? (
            <>
              <h2>Win!</h2>
              <h3>Your reward - 35 000</h3>
            </>
          ) : (
            <>
              <h2>Lose!</h2>
              <h3>Your reward - 0</h3>
            </>
          )}
        </div>

        <div style={style}>
          <img src={answers[user_answer - 1].img} alt="" width={100} />
          <h2>{answers[user_answer - 1].title}</h2>
        </div>

        {answers.map((answer, index) => (
          <Obj
            key={index}
            title={answer.title}
            about={answer.about}
            img={answer.img}
            win={answer.win}
          />
        ))}
      </div>
      <br />
      <br />
      <br />
      <BottomMenuWithoutEnergy />
    </>
  );
}
