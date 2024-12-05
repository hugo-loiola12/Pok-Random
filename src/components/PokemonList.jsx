import React, {useEffect, useState} from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
                const data = await response.json();
                setPokemons(data.results);
            } catch (error) {
                console.error("Erro ao buscar os Pokémon:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            {pokemons.map((pokemon, index) => (
                <PokemonCard key={index} name={pokemon.name} url={pokemon.url}/>
            ))}
        </div>
    );
};

export default PokemonList;
