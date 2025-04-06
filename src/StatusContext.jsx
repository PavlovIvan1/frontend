import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchGetAutoBotStatus } from './services/GET';

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('hasRunGetAutobotStatus');
    if (storedValue === 'true') {
      setHasRun(true);
    }
  }, []);

  const getAutobotStatus = async () => {
    try {
      const result = await fetchGetAutoBotStatus();
      result;
      Swal.fire({
        title: 'Autobot status',
        text: `farmed: ${result.farmed_coins} coins`,
        icon: 'info',
        preConfirm: () => {
          return autoBotClaim();
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  const callAutobotStatus = () => {
    if (!hasRun) {
      getAutobotStatus();
      localStorage.setItem('hasRunGetAutobotStatus', 'true');
      setHasRun(true);
    }
  };

  return (
    <StatusContext.Provider value={callAutobotStatus}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => {
  return useContext(StatusContext);
};
