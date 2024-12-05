import React, {useEffect, useState} from "react";

const PokemonCard = ({name, url}) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error("Erro ao buscar os detalhes do Pokémon:", error);
            }
        };

        fetchDetails();
    }, [url]);

    if (!details) return <p>Carregando {name}...</p>;

    return (
        <div style={{border: "1px solid #ccc", padding: "10px", margin: "10px"}}>
            <h3>{name}</h3>
            <img src={details.sprites.front_default} alt={name}/>
            <p>Altura: {details.height}</p>
            <p>Peso: {details.weight}</p>
        </div>
    );
};

export default PokemonCard;
