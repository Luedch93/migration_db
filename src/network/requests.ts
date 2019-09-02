import https = require('https');
import fs = require('fs');
import stream = require('stream');

export async function getPokemons(offset: number) {
    const ulr = process.env.API_URI + `/pokemon?offset=${offset}&limit=100`;
    const res = await getRequest(ulr);
    if (!res) {
        process.exit(1);
    }
    return {results: res.results, count: res.count};
}

export async function getPokemonDetail(pokemonName: string) {
    let pokemon = await getRequest(process.env.API_URI+'/pokemon/'+pokemonName);
    return pokemon;
}

export function saveImage(url: string, name: string, spriteType: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        https.request(url, (res) => {
            let myStream = new stream.Transform();
            res.on('data', chunk => {myStream.push(chunk)});
            res.on('end', () => {
                fs.writeFileSync(`public/images/${name}/${spriteType}.png` ,myStream.read());
                resolve();
            })
        }).end();
    })
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