import { useEffect, useState } from "react";
import axios from 'axios';

function AllPokemon() {
    const [pokemon, setPokemon] = useState([]);
    const [nextPage, setNextPage] = useState(null)

    useEffect(() => {
        let getPokemon = async () => {
            try {
                const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
                setPokemon (data.results);
                setNextPage (data.next);
                return data.results;
            }catch (err){
            console.error(err);
            }
        };
        getPokemon();
    }, []); 

let loadMorePokemon = async () => {
    try{
        const {data} = await axios.get(nextPage)
        setPokemon ((prevList) => [...prevList, ...data.results]);
        console.log('pokemon on state after load: ', pokemon)
        setNextPage (data.next);
    }catch(err){
        console.error(err);
        console.log('Error loading more pokemon ', err)
    }
}

    return (
        <>
            <h1>Pokemon!</h1>
            <div>
                {pokemon.map((poke) => {
                    const pokemonId = poke.url.split('/')[6];
                    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
                    return (
                        <div key={poke.name}>
                            <h3>{poke.name}</h3>
                            <img src={imageUrl} alt={poke.name}/>
                        </div>
                    )
                })}
            </div>
            <button onClick={() => loadMorePokemon()}>Load More Pokemon</button>
        </>
    )
};

export default AllPokemon;