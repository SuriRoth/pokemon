import { useEffect, useState } from "react";
import axios from 'axios';

function AllPokemon() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        let getPokemon = async () => {
            try {
                const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
                console.log('data: ', data);
                setPokemon (data.results);
                return data.results;
            }catch (err){
            console.error(err);
            }
        };
        getPokemon();
    }, []); 

console.log('pokemon: ', pokemon)


    return (
        <>
            <h1>Pokemon!</h1>
            <div>
                {pokemon.map((poke) => {
                    return (
                        <div>
                            <h3>{poke.name}</h3>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default AllPokemon;