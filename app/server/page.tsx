import React from 'react';
import AccueilServer from '../components/AccueilServer';
import { Pokemon } from '../utils/Pokemon';

interface ServerAccueilProps {
  pokemonData: Pokemon[];
}

const ServerAccueil: React.FC<ServerAccueilProps> = ({ pokemonData }) => {
  return <AccueilServer pokemonData={pokemonData} />;
};

export default ServerAccueil;

export const getServerSideProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
  const data = await response.json();
  return {
    props: {
      pokemonData: data.results,
    },
  };
};
