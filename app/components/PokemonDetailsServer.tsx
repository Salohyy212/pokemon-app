import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

interface PokemonDetailsProps {
    pokemon: {
      name: string;
      height: number;
      weight: number;
      types: { type: { name: string } }[];
      sprites: { front_default: string };
      order: number;
    };
}
const PokemonDetailsServer: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState<any>({});

  useEffect(() => {
    const id = extractIdFromUrl();
    fetchPokemonDetails(id);
  }, []);

  const extractIdFromUrl = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
  };

  const fetchPokemonDetails = async (id: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    setPokemonDetails(data);
  };

  const content = ReactDOMServer.renderToString(
    <div>
      <h1>Pokemon Details</h1>
      <div>
        <img src={pokemonDetails.sprites?.front_default} alt={pokemonDetails.name} />
        <p>Name: {pokemonDetails.name}</p>
        <p>Height: {pokemonDetails.height}</p>
        <p>Weight: {pokemonDetails.weight}</p>
        <p>Types: {pokemonDetails.types?.map((type: any) => type.type.name).join(', ')}</p>
        <p>Order: {pokemonDetails.order}</p>
      </div>
    </div>
  );

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default PokemonDetailsServer;
