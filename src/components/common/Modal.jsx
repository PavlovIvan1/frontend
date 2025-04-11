import Modal from '@mui/material/Modal'
import * as React from 'react'
import { FaStar } from 'react-icons/fa6'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#1A1A1A',
  boxShadow: 24,
  borderRadius: '20px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '320px',
};

export function BasicModal({
  text,
  onClickStars,
  onClickCoins,
  textStars,
  textCoins,
  priceStars,
  priceCoins,
  width,
  customBtnStyle,
  isOzzoPaid,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={width}>
      <button
        className="button-hover-s button-gradient"
        onClick={handleOpen}
        style={{
          color: 'black',
          border: 'none',
          borderRadius: '.75rem',
          fontWeight: '590',
          fontSize: text === 'Boost' ? '17px' : '15px',
          width: '100%',
          minHeight: text === 'Boost' ? '50px' : '40px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          letterSpacing: '1.5px',
        }}
      >
        {text}
      </button>
      <Modal 
        open={open} 
        onClose={handleClose}
        closeAfterTransition
        slot={Backdrop}
        slotProps={{
          timeout: 500,
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Затемнение
            backdropFilter: 'blur(4px)', // Размытие
            WebkitBackdropFilter: 'blur(4px)', // Для Safari
          }
        }}
      >
        <div style={style}>
          <button
            className="button-hover-s button-gradient"
            onClick={onClickStars}
            style={{
              color: 'black',
              border: 'none',
              borderRadius: '.75rem',
              fontWeight: '590',
              fontSize: '17px',
              width: '100%',
              minHeight: '50px',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              letterSpacing: '1.5px',
            }}
          >
            {textStars} <FaStar fill={'rgb(250, 197, 70)'} />
          </button>
          {isOzzoPaid && (
            <button
              className="button-hover-s button-gradient"
              onClick={onClickCoins}
              style={{
                color: 'black',
                border: 'none',
                borderRadius: '.75rem',
                fontWeight: '590',
                fontSize: '17px',
                width: '100%',
                minHeight: '50px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                letterSpacing: '1.5px',
              }}
            >
              {textCoins}
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
}
