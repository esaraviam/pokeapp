import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {getPokemonDetails} from '../features/pokemon/pokemonSlice';
import DetailCard from "./DetailCard.tsx";

const PokemonDetail: React.FC = () => {
  const {name} = useParams<{ name: string }>();
  const dispatch = useAppDispatch();
  const {selectedPokemon, status} = useAppSelector(state => state.pokemon);

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
    <div className="grid place-content-center h-screen	">
      <DetailCard pokemon_name={selectedPokemon.name} pokemonData={selectedPokemon}/>
    </div>

  );
};

export default PokemonDetail;