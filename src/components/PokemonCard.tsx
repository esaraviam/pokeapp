import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {addToCombatList, removeFromCombatList} from "../features/combat/combatSlice.ts";

interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  moves: string[];
  types: string[];
  stats: PokemonStats;
  image: string;
}

interface PokemonCardProps {
  pokemon_name: string;
  addHandler?: boolean;
  deleteHandler?: boolean;
  isFullDescription: boolean
}

const PokemonCard: React.FC<PokemonCardProps> = ({
                                                   pokemon_name,
                                                   addHandler = false,
                                                   deleteHandler = false,
                                                   isFullDescription = false
                                                 }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const dispatch = useAppDispatch();
  const combatList = useAppSelector(state => state.combatList);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon_name);
      const data = await response.json();
      const transformedPokemon: Pokemon = {
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
      setPokemon(transformedPokemon);
    };
    fetchPokemon();
  }, [pokemon_name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-orange-200 rounded-xl shadow-md overflow-hidden mb-5">
      <div className="p-4 bg-orange-500 text-white text-center">
        <h1 className="text-xl font-bold">{pokemon.name}</h1>
        <p className="text-sm">#{pokemon.id.toString().padStart(3, '0')}</p>
      </div>
      <img className="h-48 w-full object-contain" src={pokemon.image} alt={pokemon.name}/>
      <div className="p-4">

        {isFullDescription && (
          <>
            <div className="flex items-center justify-center mb-2">
              {pokemon.types.map((type) => (
                <span key={type} className="bg-red-500 text-white px-2 py-1 rounded-full text-xs mx-1">
              {type}
            </span>
              ))}
            </div>
            <div className="flex justify-between text-center">
              <div>
                <p className="text-gray-700 font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</p>
                <p className="text-gray-500 text-xs">Weight</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">{(pokemon.height / 10).toFixed(1)} m</p>
                <p className="text-gray-500 text-xs">Height</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">{pokemon.moves.join(', ')}</p>
                <p className="text-gray-500 text-xs">Moves</p>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-content text-center">
          {addHandler && (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => dispatch(addToCombatList(pokemon.name))}
            >
              Add to team
            </button>
          )}

          {deleteHandler && (
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => dispatch(removeFromCombatList(pokemon.name))}
            >
              Remove from team
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;