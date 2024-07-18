import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {getPokemonDetails} from '../features/pokemon/pokemonSlice';
import DetailCard from "./DetailCard.tsx";
import CombatList from "./CombatList.tsx";

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
    <div className="grid grid-cols-[2fr_1fr]">
      <div className="grid place-content-center h-screen	">
        <DetailCard pokemon_name={selectedPokemon.name} pokemonData={selectedPokemon}/>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">LISTOS PARA EL COMBATE</h1>
        <div className="grid grid-cols-1 gap-4">
          <CombatList/>
        </div>
      </div>
    </div>

  );
};

export default PokemonDetail;