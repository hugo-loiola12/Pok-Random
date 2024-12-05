import React, { useEffect, useState } from "react";
import "./App.css";

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    try {
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error("Erro ao buscar o Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const handlePageClick = () => {
    fetchRandomPokemon();
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="app-container" onClick={handlePageClick}>
      <h1 className="title">Pokémon Aleatório</h1>
      {pokemon && (
        <div className="pokemon-card">
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <img
            className="pokemon-image"
            src={
              pokemon.sprites.versions["generation-v"]["black-white"].animated
                .front_default || pokemon.sprites.front_default
            }
            alt={pokemon.name}
          />
          <p className="pokemon-info">Altura: {pokemon.height}</p>
          <p className="pokemon-info">Peso: {pokemon.weight}</p>
          <div className="pokemon-types">
            {pokemon.types.map((typeInfo) => {
              const typeName = typeInfo.type.name;
              return (
                <span
                  key={typeName}
                  className="pokemon-type"
                  style={{ backgroundColor: typeColors[typeName] }}
                >
                  {typeName}
                </span>
              );
            })}
          </div>
        </div>
      )}
      <p className="instructions">Clique na página para gerar outro Pokémon!</p>
    </div>
  );
};

export default App;
