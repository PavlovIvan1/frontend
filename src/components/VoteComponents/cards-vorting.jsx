import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const RocketSlider = () => {
  const [current_r, setCurrentR] = useState(1);

  const slides = [
    { id: 1, title: 'РАКЕТА С ТРАДИЦИОННЫМИ ДВИГАТЕЛЯМИ', image: '/9.png' },
    { id: 2, title: 'РАКЕТА С ЯДЕРНЫМ ДВИГАТЕЛЕМ', image: '/9.png' },
    { id: 3, title: 'РАКЕТА НА СОЛНЕЧНЫХ БАТАРЕЯХ', image: '/9.png' },
  ];

  return (
    <Box
      sx={{
        width: '300px',
        margin: 'auto',
        position: 'relative',
        paddingTop: '20px',
      }}
    >
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentR(swiper.activeIndex + 1)}
        style={{ borderRadius: '20px', overflow: 'hidden' }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Paper
              sx={{
                backgroundColor: '#1a1a2e',
                color: '#fff',
                width: '250px',
                height: '280px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '40px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                backgroundImage: `url('/CardBg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <Box
                component="img"
                src={slide.image}
                alt={slide.title}
                sx={{
                  width: '120px',
                  height: '120px',
                  marginBottom: '20px',
                }}
              />
              <Typography
                variant="h5"
                textAlign="center"
                sx={{ marginBottom: '10px' }}
              >
                {slide.id}
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {slide.title}
              </Typography>
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>
      <Typography
        sx={{
          textAlign: 'center',
          marginTop: '10px',
          color: '#fff',
          fontSize: '14px',
        }}
      >
        Текущая ракета: {current_r}
      </Typography>
    </Box>
  );
};

export default RocketSlider;
