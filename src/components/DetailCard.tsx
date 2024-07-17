import {useEffect, useState} from 'react';
import {Pokemon} from "../interfaces/Pokemon.ts";
import {fetchPokemonDetails} from "../services/pokemonService.ts";
import {Link} from "react-router-dom";

interface PokemonCardProps {
  pokemon_name: string;
  pokemonData?: Pokemon
}

const typeColors: { [key: string]: string } = {
  grass: '#74CB48',
  fire: '#F57D31',
  water: '#6493EB',
  bug: '#A7B723',
  normal: '#AAA67F',
  poison: '#A43E9E',
  electric: '#F9CF30',
  ground: '#DEC16B',
  fairy: '#E69EAC',
  fighting: '#C12239',
  psychic: '#FB5584',
  rock: '#b8a038',
  ghost: '#705898',
  ice: '#98d8d8',
  dragon: '#7038f8',
  dark: '#705848',
  steel: '#b8b8d0',
  flying: '#a890f0',
};


const DetailCard: React.FC<PokemonCardProps> = ({
                                                  pokemon_name,
                                                  pokemonData
                                                }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null | undefined>(pokemonData);


  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetchPokemonDetails(pokemon_name)
      const transformedPokemon: Pokemon = response
      setPokemon(transformedPokemon);
    };
    if (!pokemonData) {
      fetchPokemon();
    }

  }, [pokemon_name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const mainColor = typeColors[pokemon.types[0]] || '#fff';

  return (
    <div className="grid grid-cols-1 w-[350px]  rounded shadow-lg mb-4" style={{background: `${mainColor}`}}>
      <div className="grid grid-cols-3  text-gray-700 p-4">

        <div>
          <Link to={`/`}>
            <button className="w-full text-white">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_1119_190)">
                  <path d="M14.8999 25.9666L5.63325 16.6999C5.52214 16.5888 5.44436 16.4777 5.39992 16.3666C5.35547 16.2555 5.33325 16.1333 5.33325 15.9999C5.33325 15.8666 5.35547 15.7444 5.39992 15.6333C5.44436 15.5222 5.52214 15.4111 5.63325 15.2999L14.9333 5.99994C15.111 5.82216 15.3333 5.73328 15.5999 5.73328C15.8666 5.73328 16.0999 5.83328 16.2999 6.03328C16.4999 6.23328 16.5999 6.46661 16.5999 6.73328C16.5999 6.99994 16.4999 7.23328 16.2999 7.43328L8.73325 14.9999H25.2666C25.5555 14.9999 25.7944 15.0944 25.9833 15.2833C26.1721 15.4722 26.2666 15.7111 26.2666 15.9999C26.2666 16.2888 26.1721 16.5277 25.9833 16.7166C25.7944 16.9055 25.5555 16.9999 25.2666 16.9999H8.73325L16.3333 24.5999C16.511 24.7777 16.5999 24.9999 16.5999 25.2666C16.5999 25.5333 16.4999 25.7666 16.2999 25.9666C16.0999 26.1666 15.8666 26.2666 15.5999 26.2666C15.3333 26.2666 15.0999 26.1666 14.8999 25.9666Z" fill="white"/>
                </g>
                <defs>
                  <filter id="filter0_d_1119_190" x="1.33325" y="2.73328" width="28.9333" height="28.5333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1119_190"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1119_190"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1119_190" result="shape"/>
                  </filter>
                </defs>
              </svg>

            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2">

          <h1 className="text-xl text-start text-bold text-gray-200 uppercase">{pokemon.name}</h1>
        </div>
        <div>
          <p className="text-sm text-end text-white">#{pokemon.id.toString().padStart(3, '0')}</p>
        </div>
      </div>
      <div className="text-center h-1/3 translate-y-14">
        <img className="h-48 w-full object-scale-down drop-shadow-2xl " src={pokemon.image} alt={pokemon.name}/>
      </div>
      <div className="grid h-fit bg-gray-100 grid-cols-1 text-gray-700 p-4 rounded-t-xl m-1 pt-8">
        <div className="flex items-center justify-center mt-2">
          {pokemon.types.map((type: string) => {
            const color = typeColors[type] || '#fff';
            return (<span key={type} className="text-white px-2 py-1 rounded-full text-xs mx-1" style={{background: `${color}`}}>
              {type}
            </span>)
          })}
        </div>
        <div className="m-2">
          <h2 className="text-sm text-bold text-center uppercase ">About</h2>
        </div>

        <div className="grid grid-cols-3 text-xs ">
          <div className="border-r-2 border-gray-200 p-2 text-center">
            {pokemon.weight / 10} Kg
            <p>weight</p>
          </div>
          <div className="border-r-2 p-2 border-gray-200 text-center">
            {pokemon.height / 10} Mt
            <p>height</p>
          </div>
          <div className="p-2 text-start">
            <ul>
            {pokemon.moves.map(move => <li className="text-xs pt-1">{move}</li>)}
            </ul>
            <p className="text-bold">Moves</p>
          </div>
        </div>

        <h2 className="text-sm text-bold  text-center uppercase"> Stats</h2>

        <div className="grid grid-cols-1 text-xs mt-2 p-4">

          <div className="grid grid-cols-[50px_50px_1fr]">
            <div>HP</div>
            <div>{pokemon.stats.hp}</div>
            <div className="relative w-full h-2 rounded">
              <div
                className="absolute top-0 h-2 bg-green-800 rounded"
                style={{width: `${(pokemon.stats.hp / 100) * 100}%`}}
              />
            </div>
          </div>

          <div className="grid grid-cols-[50px_50px_1fr] pt-2">
            <div>ATQ</div>
            <div>{pokemon.stats.attack}</div>
            <div className="relative w-full h-2 rounded">
              <div
                className="absolute top-0 h-2 bg-red-800 rounded"
                style={{width: `${(pokemon.stats.attack / 100) * 100}%`}}
              />
            </div>
          </div>

          <div className="grid grid-cols-[50px_50px_1fr] pt-2">
            <div>DEF</div>
            <div>{pokemon.stats.defense}</div>
            <div className="relative w-full h-2  rounded">
              <div
                className="absolute top-0 h-2 bg-amber-500 rounded"
                style={{width: `${(pokemon.stats.defense / 100) * 100}%`}}
              />
            </div>
          </div>

          <div className="grid grid-cols-[50px_50px_1fr] pt-2">
            <div>SPD</div>
            <div>{pokemon.stats.speed}</div>
            <div className="relative w-full h-2  rounded">
              <div
                className="absolute top-0 h-2 bg-amber-200 rounded"
                style={{width: `${(pokemon.stats.speed / 100) * 100}%`}}
              />
            </div>
          </div>

          <div className="grid grid-cols-[50px_50px_1fr] pt-2">
            <div>SATQ</div>
            <div>{pokemon.stats.specialAttack}</div>
            <div className="relative w-full h-2 rounded">
              <div
                className="absolute top-0 h-2 bg-cyan-500 rounded"
                style={{width: `${(pokemon.stats.specialAttack / 100) * 100}%`}}
              />
            </div>
          </div>

          <div className="grid grid-cols-[50px_50px_1fr] pt-2">
            <div>SDEF</div>
            <div>{pokemon.stats.specialDefense}</div>
            <div className="relative w-full h-2 rounded">
              <div
                className="absolute top-0 h-2 bg-blue-950 rounded"
                style={{width: `${(pokemon.stats.specialDefense / 100) * 100}%`}}
              />
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default DetailCard;