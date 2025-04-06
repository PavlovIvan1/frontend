import { Input } from 'antd';
import { useNavigate } from 'react-router';
import { Title } from '../components/common/Title.jsx';
import { fetchCreateSquad } from '../services/requests.js';

const { TextArea } = Input;
let name = 'name';

const onChange = (e) => {
  'Change:', e.target.value;
  let inputValue = e.target.value;
  if (inputValue.startsWith('https://t.me/')) {
    name = inputValue.replace('https://t.me/', '');
  } else {
    name = inputValue;
  }
};

export function CreateSquadComponent() {
  const navigate = useNavigate();

  const createSquad = async () => {
    try {
      const result = await fetchCreateSquad(name);
    } catch (err) {
      console.error(err);
    } finally {
      navigate('/');
    }
  };

  return (
    <>
      <Input showCount onChange={onChange} placeholder="Your channel`s name" />
      <button
        className="button-gradient"
        style={{ fontWeight: '500' }}
        onClick={createSquad}
      >
        Create squad
      </button>
    </>
  );
}

export function CreateSquad() {
  return (
    <>
      <div className="createSquad">
        <Title title={'Create Squad'} description={'Create your own squad'} />
        <CreateSquadComponent />
      </div>
    </>
  );
}
