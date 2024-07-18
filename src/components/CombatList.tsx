import {useAppSelector} from '../hooks/useAppSelector';
import SmallCard from "./SmallCard.tsx";

const CombatList: React.FC = () => {
  const combatList = useAppSelector(state => state.combat.combatList);

  return (
    <div>
      {combatList.length === 0 ? (
        <p className="text-center text-gray-500">Aun no haz agregado a ningun pokemon.</p>
      ) : (
        <div className="grid grid-cols-2">
          {combatList.map(pokemon =>
            <SmallCard
              key={pokemon.name}
              pokemon_name={pokemon.name}
              pokemonData={pokemon}
              deleteHandler
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CombatList;