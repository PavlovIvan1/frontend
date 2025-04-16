import axios from 'axios';
import { API_URL } from '../config/config';
import { showErrorToast, showInfoToast } from '../utils/toastUtils';

const headers = {
  'Content-Type': 'application/json',
  initData: window.Telegram.WebApp.initData,
};

export const fetchData = async () => {
  const url = `${API_URL}/users`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchUserAddCoins = async (score) => {
  const integerScore = Math.floor(score);

  const url = `${API_URL}/users/add_coins/?coins=${integerScore}`;

  try {
    const response = await axios.post(url, null, { headers });
    return response;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchGetUserData = async () => {
  const url = `${API_URL}/users/${window.Telegram.WebApp.initDataUnsaafe.user.id}`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchDataSquad = async () => {
  const url = `${API_URL}/squads/`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw error;
  }
};

export const fetchSquadCreate = async (name, members) => {
  const url = `${API_URL}/squads`;

  const body = {
    name: `${name}`,
    members: members,
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw error;
  }
};

export const fetchGetSquadData = async (squadId) => {
  const url = `${API_URL}/squads/${squadId}`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw error;
  }
};

export const fetchSquadsUpdate = async (squadId) => {
  const body = {
    name: `name`,
    members: [1223, 12120],
  };

  const url = `${API_URL}/users/${squadId}/`;

  try {
    const response = await axios.put(url, body);
    `Response:`, response.data;
  } catch (error) {
    console.error(
      `Error:`,
      error.response ? error.response.data : error.message
    );
  }
};

export const deleteSquad = async (squadId) => {
  const url = `${API_URL}/squads/${squadId}/`;

  try {
    const response = await axios.delete(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchStatData = async () => {
  const url = `${API_URL}/users/get_stats/`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchSocNetData = async () => {
  const url = `${API_URL}/links`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchLigaData = async () => {
  const url = `${API_URL}/liga/`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchJoinSquad = async (id) => {
  const url = `${API_URL}/users/join_to_squad/?data=${id}`;

  try {
    const response = await axios.post(url, {}, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchCreateSquad = async (data) => {
  const url = `${API_URL}/squads/create_squad/?data=${data}`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(
        error.response.data.error || error.response.data.data || error.message
      );
      showErrorToast(
        error.response.data.error || error.response.data.data || error.message
      );
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchGetSquads = async () => {
  const url = ` ${API_URL}/squads/get_squads/`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchEarnTasksData = async () => {
  const url = `${API_URL}/earn/tasks`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchSkinsOnSaleData = async () => {
  const url = `${API_URL}/users/get_unbought_skins`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchSkinsNotOnSaleData = async () => {
  const url = ` ${API_URL}/users/get_my_skins`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchBaseUserData = async () => {
  const url = `${API_URL}/users/data`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchBoostData = async (channelname) => {
  const url = `${API_URL}/squads/boost_squad_coins/?data=${channelname}`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.detail || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchBoost2Data = async (channelname) => {
  const url = `${API_URL}/squads/create_boost_stars/?data=${channelname}`;

  try {
    const response = await axios.post(url, {}, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchCheckforStars = async (payload_token, channelname) => {
  const url = `${API_URL}/squads/check_token_status/?payload_token=${payload_token}data=${channelname}`;

  try {
    const response = await axios.get(url, { headers }); // headers должны быть определены где-то выше
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchGetSurveyData = async () => {
  const url = `${API_URL}/survey/get_survey/`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);

    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data.error ||
        error.response.data.message ||
        error.message;

      if (errorMessage === 'No surveys found for today.') {
        console.error('`No surveys found`');
        return 'No surveys found';
      }

      showErrorToast(errorMessage);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchSurveyVote = async (data, ans_n) => {
  const url = `${API_URL}/survey/vote/?data=${data}`;

  try {
    const response = await axios.post(
      url,
      { answer_number: String(ans_n) },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.detail || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchGetRefferals = async () => {
  const url = `${API_URL}/users/friends`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetychGetTaP = async () => {
  const url = `${API_URL}/users/get_tap`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchActivateAutoBot = async () => {
  const url = `${API_URL}/users/buy_autobot/`;
  try {
    const response = await axios.post(url, null, { headers });
    return response;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchClaimAutoBot = async () => {
  const url = `${API_URL}/users/collect_autobot_coins/`;
  try {
    const response = await axios.post(url, null, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchGetAutoBotStatus = async () => {
  const url = `${API_URL}/users/autobot_status/`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw error;
  }
};

export const fetchLeaveSquad = async (data) => {
  const url = `${API_URL}/squads/leave_squad?data=${data}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchUpdateTap = async (data) => {
  const url = `${API_URL}/users/update_tap?data=${data}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchBuySkin = async (id) => {
  const url = `${API_URL}/users/buy_skin/?data=${id}`;
  try {
    const response = await axios.post(url, {}, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchSelectSkin = async (id) => {
  const url = `${API_URL}/users/update_skin?data=${id}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchImproveEnergy = async (value) => {
  const url = `${API_URL}/users/boost_energy/?amount=${value}`;
  try {
    const response = await axios.post(url, {}, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchGetPrice = async () => {
  const url = `${API_URL}/users/get_price`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchBuySkinStars = async (id) => {
  const url = `${API_URL}/users/buy_skin_stars/?data=${id}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchTokenStatus = async (pt, id) => {
  const url = `${API_URL}/users/check_token_status_skin?payload_token=${pt}&data=${id}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchCreateRevote = async (channelname) => {
  const url = `${API_URL}/survey/create_revote_stars/`;

  try {
    const response = await axios.post(url, {}, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchCheckforRevote = async (payload_token, answer_n, vote_id) => {
  const url = `${API_URL}/survey/check_token_status?payload_token=${payload_token}&data=${vote_id}&answer_number=${answer_n}`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchGetEarn = async () => {
  const url = `${API_URL}/earn/tasks`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchMarkAsDone = async (task_id) => {
  const url = `${API_URL}/earn/mark-as-done/`;
  try {
    const response = await axios.post(
      url,
      {
        earn_task_id: `${task_id}`,
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchUpdateTapStars = async (value) => {
  const url = `${API_URL}/users/update_tap_stars/?data=${value}`;
  try {
    const response = await axios.post(url, {}, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchCheckTapStars = async (value, pt) => {
  const url = `${API_URL}/users/check_token_status_update_tap/?data=${value}&payload_token=${pt}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

//

export const fetchUpdateEnergyStars = async (value) => {
  const url = `${API_URL}/users/boost_energy_stars/?amount=${value}`;
  try {
    const response = await axios.post(url, {}, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};

export const fetchCheckEnergyStars = async (value, pt) => {
  const url = `${API_URL}/users/check_token_status_boost_energy/?amount=${value}&payload_token=${pt}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    if (axios.isAxiosError(error) && error.response) {
      showInfoToast(error.response.data.error || error.message);
    } else {
      showErrorToast(`Произошла неизвестная ошибка.`);
    }
    throw error;
  }
};
