import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import  { Pokemon } from '../utils/Pokemon';

interface AccueilProps {
  pokemonData: Pokemon[];
}

const AccueilClient: React.FC<AccueilProps> = ({ pokemonData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage: number = 50;

 
  const indexOfLastPokemon: number = currentPage * pokemonPerPage;
  
  const indexOfFirstPokemon: number = indexOfLastPokemon - pokemonPerPage;
  
  const currentPokemon: Pokemon[] = pokemonData.slice(indexOfFirstPokemon, indexOfLastPokemon);

  
  const nextPage = (): void => {
    setCurrentPage(currentPage + 1);
  };

  
  const prevPage = (): void => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <h1>Liste des Pokémon</h1>
      <div className="pokemon-list">
        {currentPokemon.map(pokemon => (
          <div key={pokemon.name} className="pokemon-item">
            <p>{pokemon.name}</p>
            <Link href={`/${pokemon.name}`}>
              <a>Détails</a>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={prevPage}>Précédent</button>
        )}
        {currentPokemon.length === pokemonPerPage && (
          <button onClick={nextPage}>Suivant</button>
        )}
      </div>
    </div>
  );
};

export default AccueilClient;
