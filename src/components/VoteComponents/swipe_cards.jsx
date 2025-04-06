import React, { useState } from 'react';
import Swipeable from 'react-swipy';
import Card from './Card.jsx';

if (typeof global === 'undefined') {
  window.global = window;
}

const appStyles = {
  height: '100%',
  marginBottom: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  fontFamily: 'sans-serif',
};

const wrapperStyles = { position: 'relative', width: '250px', height: '400px' };

const SwC = () => {
  const [cards, setCards] = useState(['/9.png', '/2.png', '/24.png']);

  const remove = () => setCards(cards.slice(1));

  return (
    <div style={appStyles}>
      <div style={wrapperStyles}>
        {cards.length > 0 ? (
          <div style={wrapperStyles}>
            <Swipeable onAfterSwipe={remove}>
              <Card zIndex={2}>
                <img
                  src={cards[0]}
                  alt="Card"
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'black',
                    borderRadius: '42px',
                    padding: '10px',
                    position: 'absolute',
                    bottom: '15px',
                    opacity: '0.6',
                    width: '75%',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '20px',
                    }}
                  >
                    1
                  </h3>
                  <p style={{ margin: 0, textAlign: 'center' }}>
                    Lorem text a text
                  </p>
                </div>
              </Card>
            </Swipeable>
            {cards.length > 1 && (
              <Card zIndex={-1}>
                <img
                  src={cards[1]}
                  alt="Card"
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'black',
                    borderRadius: '42px',
                    padding: '10px',
                    position: 'absolute',
                    bottom: '15px',
                    opacity: '0.6',
                    width: '75%',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <h3 style={{ margin: 0, textAlign: 'center' }}>Title</h3>
                  <p style={{ margin: 0, textAlign: 'center' }}>
                    Lorem text loreem text
                  </p>
                </div>
              </Card>
            )}
          </div>
        ) : (
          <Card zIndex={1}>
            <h2 style={{ fontSize: '30px' }}>Done!</h2>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SwC;
