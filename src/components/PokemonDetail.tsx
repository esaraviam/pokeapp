import React, { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import { getPokemonDetails } from '../features/pokemon/pokemonSlice';

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useAppDispatch();
  const { selectedPokemon, status } = useAppSelector(state => state.pokemon);

  useEffect(() => {
    if (name) {
      dispatch(getPokemonDetails(name));
    }
  }, [dispatch, name]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!selectedPokemon) {
    return <div>No Pokémon found.</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-orange-200 rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-orange-500 text-white text-center">
        <h1 className="text-xl font-bold">{selectedPokemon.name}</h1>
        <p className="text-sm">#{selectedPokemon.id.toString().padStart(3, '0')}</p>
      </div>
      <img className="h-48 w-full object-contain" src={selectedPokemon.image} alt={selectedPokemon.name} />
      <div className="p-4">
        <div className="flex items-center justify-center mb-2">
          {selectedPokemon.types.map((type:string) => (
            <span key={type} className="bg-red-500 text-white px-2 py-1 rounded-full text-xs mx-1">
              {type}
            </span>
          ))}
        </div>
        <div className="flex justify-between text-center">
          <div>
            <p className="text-gray-700 font-semibold">{(selectedPokemon.weight / 10).toFixed(1)} kg</p>
            <p className="text-gray-500 text-xs">Weight</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">{(selectedPokemon.height / 10).toFixed(1)} m</p>
            <p className="text-gray-500 text-xs">Height</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">{selectedPokemon.moves.join(', ')}</p>
            <p className="text-gray-500 text-xs">Moves</p>
          </div>
        </div>
        <Link to={`/`}>
          <button className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded">
           Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetail;