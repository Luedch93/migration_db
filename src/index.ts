import mongoose from 'mongoose';
import dotenv from 'dotenv';

import {getPokemons} from './network/requests';
import { insertPokemons, deletePokemons } from './database/actions';

dotenv.config();

(async function(){
    console.log('Staring Migration!');
    await mongoose.connect(process.env.DB_URI || '', {useNewUrlParser: true});
    console.log('Connected to database', mongoose.connection.db.databaseName);
    await deletePokemons();
    const {count} = await getPokemons(0);
    const totalPages = Math.ceil(count / 100);

    for (let i = 0; i < totalPages; i++) {
        const {results} = await getPokemons(i * 100);
        await insertPokemons(results, true);
    }

    mongoose.connection.close();
    console.log('Migration Complete');
})()
