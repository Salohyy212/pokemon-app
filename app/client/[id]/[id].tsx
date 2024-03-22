// pages/client/[id].tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PokemonDetailsClient from '../../components/PokemonDetailsClient';
import{Pokemon} from '../../utils/Pokemon';
import Link from 'next/link'; // Importez le composant Link de Next.js

const PokemonDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon details');
        }
        const data = await response.json();
        if (isPokemon(data)) {
          setPokemonDetails({
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            types: data.types.map((type: any) => type.type.name),
            order: data.order,
            image: data.sprites.front_default,
            sprites: data.sprites
          });
        }
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    if (id) {
      fetchPokemonDetails();
    }
  }, [id]);

  const isPokemon = (data: any): data is Pokemon => {
    return (
      typeof data.id === 'number' &&
      typeof data.name === 'string' &&
      typeof data.height === 'number' &&
      typeof data.weight === 'number' &&
      Array.isArray(data.types) &&
      data.types.every((type: any) => typeof type.type.name === 'string') &&
      typeof data.order === 'number' &&
      typeof data.sprites === 'object' &&
      typeof data.sprites.front_default === 'string'
    );
  };

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-page">
      <PokemonDetailsClient pokemonDetails={pokemonDetails} />
      
      {/* Lien de retour vers la liste des Pokémon */}
      <Link href="/client">
        <a>Retour à la liste des Pokémon</a>
      </Link>
    </div>
  );
};

export default PokemonDetailsPage;
