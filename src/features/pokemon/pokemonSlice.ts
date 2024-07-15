import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemons, fetchPokemonDetails } from '../../services/pokemonService';
import {PokemonState} from '../../interfaces/IPokemonState.ts'

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  status: 'idle',
};

export const getPokemons = createAsyncThunk('pokemon/getPokemons', async () => {
  const response = await fetchPokemons();
  return response;
});

export const getPokemonDetails = createAsyncThunk('pokemon/getPokemonDetails', async (pokemon_name: string) => {
  const transformedPokemon = await fetchPokemonDetails(pokemon_name);
  return transformedPokemon;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemons = action.payload;
      })
      .addCase(getPokemons.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getPokemonDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPokemonDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPokemon = action.payload;
      })
      .addCase(getPokemonDetails.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default pokemonSlice.reducer;