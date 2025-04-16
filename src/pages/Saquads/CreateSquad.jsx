import { useState } from 'react';
import { Title } from '../../components/common/Title.jsx';
import { fetchCreateSquad } from '../../services/requests.js';

export function CreateSquad() {
  const [channelName, setChannelName] = useState('');

  // Функция для создания канала
  const createSquad = async () => {
    if (!channelName) return; // Проверяем, чтобы не отправлять пустое имя канала
    try {
      const result = await fetchCreateSquad(channelName);
      console.log(result); // Выводим результат (при необходимости)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="Page CreateSquad">
        <Title title={'Create squad'} />
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          style={styles.input}
          placeholder="Enter channel name..."
        />
        <div
          className="button-gradient"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
          onClick={createSquad}
        >
          Create
        </div>
      </div>
    </>
  );
}

const styles = {
  input: {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: '15px',
    border: '1px solid #555',
    backgroundColor: '#444',
    color: '#fff',
    outline: 'none',
    fontSize: '16px',
  },
};
