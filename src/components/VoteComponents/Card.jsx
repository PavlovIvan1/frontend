import React from 'react';

const cardStyles = {
  background:
    'linear-gradient(13deg, rgba(91,66,206,1) 0%, rgba(66,52,130,1) 69%)',
  backgroundImage: 'url("/CardBg.png")',
  borderRadius: '42px',
  width: '250px',
  height: '280px',
  cursor: 'pointer',
  userSelect: 'none',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  boxShadow: '1px 1px 100px 1px rgb(162 142 255 / 50%)',
  marginTop: '100px',
  marginBottom: '100px',
  flexDirection: 'column',
};

const Card = ({ children, zIndex = 5 }) => (
  <div style={{ ...cardStyles, zIndex }}>{children}</div>
);

export default Card;
