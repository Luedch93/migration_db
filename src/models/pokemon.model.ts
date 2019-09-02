import mongoose, { Schema } from "mongoose";

export interface IPokemon {
    name: string;
    height: number;
    weight: number;
    sprites: string[];
    stats: IStat[];
    types: IType[];
}
export interface IStat {
    base_stat: number;
    effort: number;
    stat: any;
}
export interface IType {
    slot: number;
    type: any;
}

const StatSchema: Schema<IStat> = new Schema({
    base_stat: Number,
    effort: Number,
    stat: {
        name: String
    }
});

const TypeSchema: Schema<IType> = new Schema({
    slot: Number,
    type: {
        name: String
    }
})

const PokemonSchema: Schema<IPokemon> = new Schema({
    name: {type: String, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    sprites: {
        back_default: String,
        back_female: String,
        back_shiny: String,
        back_shiny_female: String,
        front_default: String,
        front_female: String,
        front_shiny: String,
        front_shiny_female: String
    },
    stats: [StatSchema],
    types: [TypeSchema]
});

export const Pokemon = mongoose.model('Pokemon', PokemonSchema);