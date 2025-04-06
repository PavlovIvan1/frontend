import { Title } from '../../components/common/Title.jsx';
import styles from '../Saquads/Squads.module.scss';

export function SquadOpenInSquad() {
  return (
    <>
      <div className="SquadOpenIS">
        <div className="squad-info">
          <img src="/14.png" alt="" className="person" />
          <h3>Wallet News</h3>
          <span>5,003,565 joiners</span>
          <button className="button-grey"></button>
        </div>
        <div>
          <Title
            title={'Boost'}
            className="left-text"
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            }
          />
          <img src="/16.png" alt="" className="bs" height={200} width={360} />
          <button className="button-grey">Buttton</button>
        </div>

        <button className={styles.button_gradient}>Button</button>
      </div>
    </>
  );
}
