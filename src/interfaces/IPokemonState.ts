import {IPokemon as Pokemon} from "./IPokemon.ts";

export interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}