import axios from 'axios';
import {Pokemon} from "../interfaces/Pokemon.ts";

const POKE_API_URL = 'https://pokeapi.co/api/v2';



export const fetchPokemons = async (): Promise<Pokemon[]> => {
  const response = await axios.get(`${POKE_API_URL}/pokemon?limit=151`);
  const promiseArray = response.data.results.map((pokemon: { name: string }) => {
    return fetchPokemonDetails(pokemon.name);
  });
  const results = await Promise.all(promiseArray);
  return results;
};
export const fetchPokemonDetails = async (pokemon_name: string): Promise<Pokemon> => {
  const response = await axios.get(`${POKE_API_URL}/pokemon/${pokemon_name}`);
  const data = response.data;
  return {
    id: data.id,
    name: data.name,
    weight: data.weight,
    height: data.height,
    moves: data.moves.slice(0, 2).map((move: any) => move.move.name),
    types: data.types.map((type: any) => type.type.name),
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    },
    image: data.sprites.other['official-artwork'].front_default,
  };
};