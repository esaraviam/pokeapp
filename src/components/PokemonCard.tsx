import {useEffect, useState} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {Link} from 'react-router-dom';
import {addToCombatList, removeFromCombatList} from "../features/combat/combatSlice.ts";
import {Pokemon} from "../interfaces/Pokemon.ts";
import {fetchPokemonDetails} from "../services/pokemonService.ts";

interface PokemonCardProps {
  pokemon_name: string;
  addHandler?: boolean;
  deleteHandler?: boolean;
  isFullDescription: boolean;
  pokemonData: Pokemon
}

const PokemonCard: React.FC<PokemonCardProps> = ({
                                                   pokemon_name,
                                                   addHandler,
                                                   deleteHandler,
                                                   isFullDescription = false,
                                                   pokemonData
                                                 }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(pokemonData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetchPokemonDetails(pokemon_name)
      const transformedPokemon: Pokemon = response
      setPokemon(transformedPokemon);
    };
    if (!pokemonData) {
      fetchPokemon();
    }

  }, [pokemon_name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-orange-200 rounded-xl shadow-md overflow-hidden mb-4">
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

        <div className="grid grid-cols-1">
          {addHandler && (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => dispatch(addToCombatList(pokemon?.name))}
            >
              Add to team
            </button>
          )}

          {deleteHandler && (
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => dispatch(removeFromCombatList(pokemon?.name))}
            >
              Remove from team
            </button>
          )}

          <Link to={`/pokemon/${pokemon.id}`}>
            <button className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;