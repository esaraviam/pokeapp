import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts"

import {getPokemonDetails} from '../features/pokemon/pokemonSlice';
import PokemonCard from "./PokemonCard.tsx";

const PokemonDetail: React.FC = () => {
  const {name} = useParams<{ name: string }>();

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && selectedPokemon && (

        <PokemonCard pokemon_name={selectedPokemon.name} isFullDescription/>

      )}
    </div>
  );
};

export default PokemonDetail;