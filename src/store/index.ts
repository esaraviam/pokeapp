import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import combatReducer from '../features/combat/combatSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    combat: combatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;