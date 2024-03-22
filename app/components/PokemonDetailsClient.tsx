import React from 'react';
import {Pokemon} from '../utils/Pokemon';

interface DetailsProps {
  pokemonDetails: Pokemon;
}

const Details: React.FC<DetailsProps> = ({ pokemonDetails }) => {
  return (
    <div>
      <h1>Pokemon Details</h1>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <p>Name: {pokemonDetails.name}</p>
      <p>Height: {pokemonDetails.height}</p>
      <p>Weight: {pokemonDetails.weight}</p>
      <p>Types: {pokemonDetails.types.map(type => type.type.name).join(', ')}</p>
      <p>Number: {pokemonDetails.order}</p>
    </div>
  );
};

export default Details