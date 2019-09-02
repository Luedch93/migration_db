import mongoose, { Schema } from "mongoose";

export interface IPokemon {
    name: string;
    sprites: string[];
}

const PokemonSchema: Schema<IPokemon> = new Schema({
    name: {type: String, required: true},
    sprites: {
        back_default: String,
        back_female: String,
        back_shiny: String,
        back_shiny_female: String,
        front_default: String,
        front_female: String,
        front_shiny: String,
        front_shiny_female: String
    }
});

export const Pokemon = mongoose.model('Pokemon', PokemonSchema);