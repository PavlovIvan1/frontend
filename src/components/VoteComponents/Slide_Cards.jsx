import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import React, { useEffect, useState } from 'react';
import {
  fetchCreateRevote,
  fetchGetSurveyData,
  fetchSurveyVote,
} from '../../services/requests.js';

import 'sweetalert2/src/sweetalert2.scss';
import { API_URL, URL } from '../../config/config.js';
import { Loading } from '../../Loading.jsx';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../../utils/toastUtils.js';

export const GetSurveyDataWithCheck = async () => {
  const url = `${API_URL}/survey/get_survey/`;
  try {
    const response = await axios.get(url, {
      'Content-Type': 'application/json',
      initData: window.Telegram.WebApp.initData,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);

    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data.error ||
        error.response.data.message ||
        error.message;

      if (errorMessage === 'No surveys found for today.') {
        console.log("'No surveys found for today.'");
      }

      showErrorToast(errorMessage);
    } else {
      showErrorToast('Произошла неизвестная ошибка.');
    }
    throw error;
  }
};

export function SlideCard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [slidesData, setSlidesData] = useState(null);
  const [vData, setVData] = useState(null);
  const [revoteData, setRevoteData] = useState(null);

  const handleSlideChange = (splide) => {
    setCurrentSlide(splide.index);
    `Текущий слайд: ${splide.index + 1}`;
  };

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
          setSlidesData(result.data);
          setVData(result);
        }
      } catch (err) {
        console.error('err', err);
        setSlidesData(null);
      } finally {
        setLoading(false);
      }
    };

    const RevoteStars = async () => {
      'CS', currentSlide + 1, slidesData;

      try {
        let res = await fetchCreateRevote();
        setRevoteData(res)(res);
      } catch (err) {
        console.error(err);
      }
    };

    RevoteStars();
    getSurvey();
  }, []);

  const checkForRevoe = async (pt) => {
    try {
      const data = await fetchCheckforStars(
        pt,
        currentSlide + 1,
        slidesData.id
      );
      return data;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const Vote = async () => {
    'CS', currentSlide + 1, slidesData;

    try {
      if (!vData.user_answer) {
        let res = await fetchSurveyVote(slidesData.id, currentSlide + 1);
        res;
        showSuccessToast(res.message || 'Успешно');
        window.location.reload();
      } else {
        showErrorToast('Вы уже голосовали');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const Revote = async () => {
    'CS', currentSlide + 1, slidesData;

    try {
      let res = await fetchSurveyVote(slidesData.id, currentSlide + 1);
      res;
      showSuccessToast(res.message || 'Успешно');
    } catch (err) {
      console.error(err);
    }
  };

  const initiatePayment = () => {
    if (revoteData) {
      if (revoteData.ready_to_pay) {
        window.Telegram.WebApp.openInvoice(revoteData.payment_link);

        if (checkForRevoe(revoteData.payload_token).is_paid) {
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
    } else {
      showInfoToast('Подождите пару секунд...');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-40px',
        }}
      >
        <Splide
          aria-label="My Favorite Images"
          onMove={handleSlideChange}
          style={{ width: '250px' }}
          options={{
            arrows: false,
            pagination: false,
            type: 'slide',
            drag: true,
            flickPower: 400,
            speed: 600,
            easing: 'ease',
          }}
        >
          {[1, 2, 3].map((num) => {
            const isActive = vData.user_answer === num;
            return (
              <SplideSlide key={slidesData.id - num}>
                <div
                  className="SlideContainer"
                  style={{
                    backgroundImage: `url(${isActive ? '/BgChosed.png' : '/CardBg.png'})`,
                  }}
                >
                  <img
                    src={
                      slidesData[`photo${num}`]
                        ? `${URL}${slidesData[`photo${num}`]}`
                        : '/placeholder-image.png'
                    }
                    alt={
                      slidesData[`photo${num}`]
                        ? `Answer ${num}`
                        : 'Image not available'
                    }
                    style={{ width: '100px', marginBottom: '10px' }}
                  />

                  <div
                    style={{
                      textAlign: 'center',
                      backgroundColor: 'black',
                      borderRadius: '42px',
                      padding: '10px',
                      minWidth: '100px',
                      opacity: '0.6',
                      height: '50px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      color: 'white',
                      position: 'absolute',
                      bottom: '15px',
                    }}
                  >
                    <h3
                      style={{ margin: 0, textAlign: 'center', color: 'white' }}
                    >
                      {slidesData[`answer${num}`]}
                    </h3>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>

        <button className="button-gradient" onClick={initiatePayment}>
          Переголосовать
        </button>
        <button className="button-gradient" onClick={Vote}>
          Vote
        </button>
      </div>
    </>
  );
}
