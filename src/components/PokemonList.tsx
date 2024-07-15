import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { getPokemons } from '../features/pokemon/pokemonSlice';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pokemons, status } = useAppSelector(state => state.pokemon);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPokemons());
    }
  }, [dispatch, status]);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredPokemons(filtered);
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="text-xl font-bold">Que pokemon buscas...</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && (
          <>
            {filteredPokemons.map(pokemon => (
              <PokemonCard key={pokemon.name} pokemon_name={pokemon.name} addHandler isFullDescription={false} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PokemonList;