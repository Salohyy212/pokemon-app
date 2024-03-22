// pages/client/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface PokemonDetails {
  image: string;
  name: string;
  height: number;
  weight: number;
  types: string[];
  order: number;
}

const Details: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPokemonDetails = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemonDetails({
          image: data.sprites.front_default,
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type: any) => type.type.name),
          order: data.order
        });
      };
      fetchPokemonDetails();
    }
  }, [id]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details">
      <h1>Détails du Pokémon</h1>
      <div className="pokemon-details">
        <img src={pokemonDetails.image} alt={pokemonDetails.name} />
        <p>Nom: {pokemonDetails.name}</p>
        <p>Taille: {pokemonDetails.height}</p>
        <p>Poids: {pokemonDetails.weight}</p>
        <p>Types: {pokemonDetails.types.join(', ')}</p>
        <p>Numéro: {pokemonDetails.order}</p>
      </div>
    </div>
  );
};

export default Details;
