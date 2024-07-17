import {useEffect, useState} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {Link} from 'react-router-dom';
import {addToCombatList, removeFromCombatList} from "../features/combat/combatSlice.ts";
import {Pokemon} from "../interfaces/Pokemon.ts";
import {fetchPokemonDetails} from "../services/pokemonService.ts";

interface SmallCardProps {
  pokemon_name: string;
  addHandler?: boolean;
  deleteHandler?: boolean;
  pokemonData?: Pokemon
}

const SmallCard: React.FC<SmallCardProps> = ({
                                               pokemon_name,
                                               addHandler,
                                               deleteHandler,
                                               pokemonData
                                             }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null | undefined>(pokemonData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPokemon = async () => {
      setPokemon(await fetchPokemonDetails(pokemon_name));
    };
    if (!pokemonData) {
      fetchPokemon();
    }

  }, [pokemon_name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="grid grid-cols-1 bg-gray-100 rounded-xl shadow-xl border-1 border-gray-200  px-4 transition ease-in-out delay-50 duration-300  scale-90 hover:scale-100">
        <div className="grid grid-cols-2 pr-4">
          <p className="text-sm text-start pt-4">#{pokemon.id.toString().padStart(3, '0')}</p>
          <div className="text-end grid grid-cols-2 place-content-end">
            {addHandler ? (
              <div className="text-end">
                <button className="
                          m-4 w-8 h-8 shadow-xl
                          text-xs text-center
                          rounded-full border-2
                          hover:scale-125
                          "
                        onClick={() => dispatch(addToCombatList(pokemon.name))}
                >+
                </button>
              </div>
            ) : <div></div>}


            <Link className="text-end" to={`/pokemon/${pokemon.id}`}>
              <button className="m-4 w-8 h-8 shadow-xl
                          text-xs text-center
                          rounded-full border-2
                          hover:scale-125">
                🔍
              </button>
            </Link>

          </div>

        </div>
        <div className="mb-4">
          <button className="w-full" onClick={() => dispatch(addToCombatList(pokemon.name))}>
            <img className="h-24 w-full object-contain drop-shadow-2xl" src={pokemon.image} alt={pokemon.name}/>
          </button>

        </div>
        <div className="text-center pb-4 cursor-pointer   hover:underline hover:scale-110">
          <Link to={`/pokemon/${pokemon.id}`}>
            <h3 className="text-sm font-bold capitalize">{pokemon.name}</h3>
          </Link>


        </div>
        <div className="text-end">
          {deleteHandler && (<button className="
                          m-4 w-8 h-8 shadow-xl
                          text-xs text-center
                          rounded-full border-2
                          hover:scale-125
                          "
                                     onClick={() => dispatch(removeFromCombatList(pokemon.name))}
          >🗑️
          </button>)}
        </div>
      </div>
    </>
  )
    ;
};

export default SmallCard;