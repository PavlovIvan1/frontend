import { create } from 'zustand';
import { fetchBaseUserData, fetychGetTaP } from '../services/requests';

export const useStore = create((set) => ({
  amount: 1,
  score: 0,
  cur_energy: 1,
  isSurvey: true,
  setIsSurvey: (value) => set({ isSurvey: value }),

  increaseScore: (additionalAmount = 1) =>
    set((state) => ({ score: state.score + additionalAmount * state.amount })),

  increaseCurrentEnergy: (additionalEnergy) =>
    set((state) => ({ cur_energy: state.cur_energy + additionalEnergy })),

  resetScore: () => set({ score: 0 }),

  updateScoreFromBackend: async () => {
    try {
      const data = await fetchBaseUserData();
      set((state) => ({ score: data.coins }));
    } catch (error) {
      console.error('Failed to update score from backend:', error);
    }
  },

  updateCurrentEnergyFromBackend: async () => {
    try {
      const data = await fetychGetTaP();
      set((state) => ({ cur_energy: data.current_energy }));
    } catch (error) {
      console.error('Failed to update score from backend:', error);
    }
  },

  setAmount: (newAmount) => set({ amount: newAmount }),

  setCurrentEnergy: (newEnergy) => set({ cur_energy: newEnergy }),
}));
