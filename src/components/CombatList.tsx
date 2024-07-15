import React from 'react';
import {useAppSelector} from '../hooks/useAppSelector';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {removeFromCombatList} from '../features/combat/combatSlice';
import PokemonCard from './PokemonCard';

const CombatList: React.FC = () => {
  const dispatch = useAppDispatch();
  const combatList = useAppSelector(state => state.combat.combatList);

  return (
    <div>
      {combatList.length === 0 ? (
        <p className="text-center text-gray-500">Aun no haz agregado a ningun pokemon.</p>
      ) : (
        <div>
          {combatList.map(pokemon =>
            <PokemonCard
              pokemon_name={pokemon}
              isFullDescription={false}
              deleteHandler
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CombatList;