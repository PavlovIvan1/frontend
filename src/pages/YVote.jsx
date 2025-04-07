import { BottomMenuWithoutEnergy } from '../components/BottomMenu/BM_wit_energy.jsx'
import { Title } from '../components/common/Title.jsx'
import SwC from '../components/VoteComponents/swipe_cards.jsx'

export function YVote() {
  return (
    <>
      <div className="notVote">
        <Title
          title="Voting"
          description={
            'Pick the card that the most people vote for and get 35,000 coins'
          }
        />
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
            marginBottom: '-50px',
          }}
        >
          <p style={{ color: '#C9BEE1' }}>
            If you had the opportunity to choose a spaceship to travel in, which
            one would you choose
          </p>
        </div>
        <SwC />
        <button
          className="button-grey"
          style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}
        >
          You picked .....
        </button>
      </div>
      <BottomMenuWithoutEnergy />
    </>
  );
}
