#!/bin/bash

# Navega al directorio del proyecto

# Crea los directorios principales
mkdir -p src/components src/features/pokemon src/features/combat src/hooks src/services src/store

# Crea archivos base en cada directorio
touch src/components/PokemonList.tsx
touch src/components/PokemonDetail.tsx
touch src/components/CombatList.tsx
touch src/components/SearchBar.tsx

touch src/features/pokemon/pokemonSlice.ts
touch src/features/pokemon/Pokemon.tsx
touch src/features/combat/combatSlice.ts

touch src/hooks/useAppDispatch.ts
touch src/hooks/useAppSelector.ts

touch src/services/pokemonService.ts

touch src/store/index.ts

# Mensaje final
echo "Estructura de archivos creada exitosamente."

