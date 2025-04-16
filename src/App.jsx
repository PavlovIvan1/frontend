import { useEffect, useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import './App.scss';
import { BottomMenu } from './components/BottomMenu/BM';
import { Mining } from './components/MiningComponents/Mining.jsx';
import {
  fetchBaseUserData,
  fetchClaimAutoBot,
  fetchGetAutoBotStatus,
  fetchLigaData,
  fetchUserAddCoins,
  fetychGetTaP,
} from './services/requests.js';
import { useStore } from './store/useStore.js';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import 'reactjs-popup/dist/index.css';

import { Loading } from './Loading.jsx';
import { showInfoToast, showSuccessToast } from './utils/toastUtils.js';

import { isMobile } from 'react-device-detect';

export function Squad({
  name,
  photo,
  id,
  channelname,
  members_count,
  position,
  position_squad,
}) {
  const navigate = useNavigate();

  const data = {
    name: name,
    photo: photo,
    id: id,
    channelname: channelname,
    members_count: members_count,
    position: position,
    position_squad: position_squad,
  };

  const nav = () => {
    if (name) {
      navigate('/squadopen', { state: data });
    } else {
      navigate('/squads');
    }
  };

  return (
    <div className="squad" onClick={nav}>
      <div className="ico">
        {photo ? (
          <img src={photo} alt="Squad Photo" className="squad_ico" />
        ) : (
          <BsFillPeopleFill className="squad_ico" />
        )}
      </div>
      <h3>{name || 'Join Squad'}</h3>
      <FaChevronRight fill="white" />
    </div>
  );
}

export function Balance({ money, liga }) {
  const formattedMoney = money.toLocaleString('en-US');

  return (
    <div className="balance_info">
      <div className="balance">
        <img src="/24.png" alt="" width={80} />
        <h1>{formattedMoney}</h1>
      </div>
      <div className="legaue">
        <h5>{liga}</h5>
      </div>
    </div>
  );
}

export function App() {
  const [dataLiga, setDataLiga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSkin, setLoadingSkin] = useState(true);
  const [user, setUser] = useState(null);
  const [ligaName, setLigaName] = useState('liga');
  const [usercoins, setUsercoins] = useState(120);
  const [isClick, setIsClick] = useState(false);

  const score = useStore((state) => state.score);

  const { updateScoreFromBackend } = useStore();
  const { increaseScore, setAmount, amount } = useStore();

  const [getTap, setGetTap] = useState(null);

  const navigate = useNavigate();

  window.Telegram.WebApp.setHeaderColor('#000000');
  window.Telegram.WebApp.disableVerticalSwipes();

  const getLiga = async (coins) => {
    try {
      const result = await fetchLigaData();
      setDataLiga(result);

      const matchingLeague = result.find(
        (liga) =>
          coins >= Number(liga.fromnumber) && coins < Number(liga.tonumber)
      );
      setLigaName(matchingLeague.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.BackButton.hide();

    if (window.Telegram.WebApp.isVersionAtLeast(8.0)) {
      window.Telegram.WebApp.requestFullscreen();
    } else {
      console.warn('Fullscreen API недоступен');
    }

    if (!isMobile) {
       navigate('/mobapp')
    }

    const addRefcoins = async () => {
      try {
        const result = await fetchUserAddCoins();
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSkin(false);
      }
    };

    const getData = async () => {
      try {
        const result = await fetchBaseUserData();
        setUser(result);
        setUsercoins(result.coins);
        getLiga(result.coins);
        amount;
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSkin(false);
      }
    };

    getData();

    const getTap = async () => {
      try {
        const result = await fetychGetTaP();
        setGetTap(result);
        setAmount(Math.floor(result.tap));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTap();

    updateScoreFromBackend();

    const getAutobotStatus = async () => {
      try {
        const result = await fetchGetAutoBotStatus();

        if (result.farmed_coins >= 15000) {
          Swal.fire({
            title: 'Autobot status',
            text: `farmed: ${result.farmed_coins} coins`,
            icon: 'info',
            preConfirm: () => {
              return autoBotClaim();
            },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    getAutobotStatus();
  }, []);

  const autoBotClaim = async () => {
    try {
      const result = await fetchClaimAutoBot();
      result;
      if (result.success) {
        showSuccessToast(result.success || '');
      } else {
        showInfoToast(result.info || '');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || loadingSkin) {
    return <Loading />;
  }

  return (
    <>
      <div className="Home">
        <br />
        <br />
        <Squad
          name={user?.squad?.name || null}
          photo={user?.squad?.photo || null}
          id={user?.squad?.id || null}
          channelname={user?.squad?.channelname || null}
          members_count={user?.squad?.members_count || null}
          position={user?.squad?.position_squad || null}
        />

        <Balance money={score} liga={ligaName} />

        <Mining setIsClick={setIsClick} />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <BottomMenu isClick={isClick} setIsClick={setIsClick} />
    </>
  );
}
