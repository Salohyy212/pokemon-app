import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PokemonDetailsClient from '../../components/PokemonDetailsClient';
import {Pokemon} from '../../utils/Pokemon';

const PokemonDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);

  useEffect(() => {
    console.log('ID:', id); 

    const fetchPokemonDetails = async () => {
      if (!id) return; 

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon details');
        }
        const data = await response.json();
        setPokemonDetails({
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types,
          order: data.order,
          sprites: data.sprites,
          image: data.sprites.front_default
        });
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-page">
      <PokemonDetailsClient pokemonDetails={pokemonDetails} />
    </div>
  );
};

export default PokemonDetailsPage; 

