import React from "react";
import PokemonList from "./components/PokemonList.tsx";
import CombatList from "./components/CombatList.tsx";

export default function Layout() {
  return (

    <>
      <div className="flex">
        <div className="md:w-2/3 p-4">
          <div className="mb-4">
            <h1 className="text-xl font-bold">Que pokemon buscas...</h1>
          </div>
          <PokemonList/>
        </div>
        <div className="md:w-1/3 p-4 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">LISTOS PARA EL COMBATE</h1>
          <div className="grid grid-cols-1 gap-4">
            <CombatList/>
          </div>
        </div>
      </div>

    </>

  )
}