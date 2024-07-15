import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CombatState {
  combatList: any[];
}

const initialState: CombatState = {
  combatList: [],
};

const combatSlice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    addToCombatList: (state, action: PayloadAction<any>) => {

      console.log(state.combatList)
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