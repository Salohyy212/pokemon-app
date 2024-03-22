// [id].tsx (Serveur)

import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import PokemonDetailsServer from '../../components/PokemonDetailsServer';

interface PokemonIdServerProps {
  id: string;
}

const PokemonIdServer: React.FC<PokemonIdServerProps> = ({ id }) => {
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();

    return () => {
      // Cleanup function
    };
  }, [id]);

  const content = ReactDOMServer.renderToString(
    <div>
      {pokemonDetails ? (
        <div>
          <h1>Pokemon ID: {id}</h1>
          <PokemonDetailsServer pokemon={pokemonDetails} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default PokemonIdServer;
