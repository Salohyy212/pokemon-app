'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const Accueil: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      const offset = (currentPage - 1) * 50;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`);
      const data = await response.json();
      const pokemonsData: Pokemon[] = data.results.map((pokemon: any, index: number) => ({
        id: offset + index + 1,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`
      }));
      setPokemons(pokemonsData);
    };
    fetchPokemons();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="accueil" style={{ textAlign: 'center' }}>
      <h1>List of the pokemons</h1>
      <div className="pokemon-list">
        {pokemons.map(pokemon => (
          <div className="pokemon-card" key={pokemon.id}>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>{pokemon.name}</p>
          <Link href={`/client/${pokemon.id}`} >
             <button style={{ marginTop:'1%', padding:'3px'}}>Details</button>
          </Link>
        </div>
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && <button onClick={handlePreviousPage}>Précédent</button>}
        <button onClick={handleNextPage} style={{ marginTop:'1%', padding:'5px'}}>Suivant</button>
      </div>
    </div>
  );
};

export default Accueil;