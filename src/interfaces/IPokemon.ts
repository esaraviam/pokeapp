import {PokemonStats} from "./PokemonStats.ts";

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  moves: string[];
  types: string[];
  stats: PokemonStats;
  image: string;
}