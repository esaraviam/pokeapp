import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch.ts';
import {  useAppSelector } from '../hooks/useAppSelector.ts';
import { getPokemons } from '../features/pokemon/pokemonSlice';
import { addToCombatList } from '../features/combat/combatSlice';
import PokemonCard from "./PokemonCard.tsx";

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pokemons, status } = useAppSelector(state => state.pokemon);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPokemons());
    }
  }, [dispatch, status]);

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">

      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <>
          {pokemons.map(pokemon => (
            <PokemonCard pokemon_name={pokemon.name} addHandler={() => console.log("aca")} />
          ))}
        </>
      )}
    </div>
  );
};

export default PokemonList;