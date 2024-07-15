import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CombatState {
  combatList: string[];
}

const initialState: CombatState = {
  combatList: [],
};

const combatSlice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    addToCombatList: (state, action: PayloadAction<string>) => {
      if (state.combatList.length < 6 && !state.combatList.find(pokemon => pokemon === action.payload)) {
        state.combatList.push(action.payload);
      }
    },
    removeFromCombatList: (state, action: PayloadAction<string>) => {
      state.combatList = state.combatList.filter(pokemon => pokemon !== action.payload);
    },
  },
});

export const { addToCombatList, removeFromCombatList } = combatSlice.actions;
export default combatSlice.reducer;