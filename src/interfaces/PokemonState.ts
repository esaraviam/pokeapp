import {Pokemon} from "./Pokemon.ts";

export interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}