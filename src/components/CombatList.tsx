import {useAppSelector} from '../hooks/useAppSelector';
import SmallCard from "./SmallCard.tsx";

const CombatList: React.FC = () => {
  const combatList = useAppSelector(state => state.combat.combatList);

  return (
    <div>
      {combatList.length === 0 ? (
        <p className="text-center text-gray-500">Aun no haz agregado a ningun pokemon.</p>
      ) : (
        <div>
          {combatList.map(pokemon =>
            <SmallCard
              pokemon_name={pokemon}
              deleteHandler
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CombatList;