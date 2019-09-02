import mongoose from 'mongoose';
import https = require('https');

import { Pokemon, IPokemon } from './models/pokemon.model';

import dotenv from 'dotenv';
dotenv.config();

(async function(){
    console.log('Staring Migration!');
    await mongoose.connect(process.env.DB_URI || '', {useNewUrlParser: true});
    console.log('Connected to database', mongoose.connection.db.databaseName);
    await Pokemon.deleteMany({});
    
    const pokemons = await getPokemons();
    let pokemonArray: IPokemon[] = [];

    for (const p of pokemons) {
        let {name, sprites} = await getPokemonDetail(p.name);
        console.log('Catched pokemon', name);
        pokemonArray.push({name, sprites});
    };

    await Pokemon.insertMany(pokemonArray);
    mongoose.connection.close();
    console.log('Migration Complete')
})()

async function getPokemons() {
    const ulr = process.env.API_URI + '/pokemon';
    const res = await getRequest(ulr);
    if (!res) {
        process.exit(1);
    }
    return res.results;
}

async function getPokemonDetail(pokemonName: string) {
    let pokemon = await getRequest(process.env.API_URI+'/pokemon/'+pokemonName);
    return pokemon;
}

function getRequest(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        https.get(url, (res) => {
            let result = '';
            res.on('data', chunk => {result += chunk });
            res.on('end', () => {
                resolve(JSON.parse(result));
            });
        })
    })
}