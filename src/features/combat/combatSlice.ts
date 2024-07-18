import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Pokemon} from "../../interfaces/Pokemon.ts";

interface CombatState {
  combatList: Pokemon[];
}

const initialState: CombatState = {
  combatList: [],
};

const combatSlice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    addToCombatList: (state, action: PayloadAction<Pokemon>) => {
      if (state.combatList.length < 6 && !state.combatList.find(pokemon => pokemon.name === action.payload.name)) {
        state.combatList.push(action.payload);
      }
    },
    removeFromCombatList: (state, action: PayloadAction<Pokemon>) => {
      state.combatList = state.combatList.filter(pokemon => pokemon.name !== action.payload.name);
    },
  },
});

export const { addToCombatList, removeFromCombatList } = combatSlice.actions;
export default combatSlice.reducer;