import { useEffect, useState } from 'react';
import { BottomMenuWithoutEnergy } from '../components/BottomMenu/BM_wit_energy.jsx';
import { Title } from '../components/common/Title.jsx';
import { SlideCard } from '../components/VoteComponents/Slide_Cards.jsx';
import { fetchGetSurveyData } from '../services/requests.js';

import { useNavigate } from 'react-router';
import { Loading } from '../Loading.jsx';

export function NotVote() {
  const [loading, setLoading] = useState(true);
  const [slidesData, setSlidesData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSurvey = async () => {
      try {
        const result = await fetchGetSurveyData();

        if (result == 'No surveys found') {
          return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <h2>No surveys for today</h2>
            </div>
          );
        } else {
          setSlidesData(result);
          if (slidesData.results) {
            navigate('/earnvofin');
          }
        }
      } catch (err) {
        console.error(err);
        return <div>No votes yet</div>;
      } finally {
        setLoading(false);
      }
    };
    getSurvey();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {slidesData ? (
        <div className="notVote">
          <Title
            title="Voting"
            description={
              'Pick the card that the most people vote for and get 35,000 coins'
            }
          />
          <p style={{ fontSize: '18px', color: '#a0a09f' }}>
            {' '}
            <span style={{ fontWeight: '600', color: 'white' }}>
              {slidesData.left}
            </span>{' '}
            left until the poll closes{' '}
          </p>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '500',
              backgroundColor: '#1E1E1D',
              opacity: '0.9',
              height: '100px',
              borderRadius: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              boxSizing: 'border-box',
              textAlign: 'center',
              marginBottom: '100px',
            }}
          >
            <p style={{ color: '#C9BEE1' }}>{slidesData.data.text}</p>
          </div>
          <SlideCard />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      ) : (
        <>
          <div
            className="noSurveys"
            style={{
              height: '90vh',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1 style={{ textAlign: 'center' }}>No surveys found for today</h1>
          </div>
        </>
      )}
      <BottomMenuWithoutEnergy />
    </>
  );
}
