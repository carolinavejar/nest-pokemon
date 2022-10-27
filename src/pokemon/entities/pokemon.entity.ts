import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Pokemon extends Document {
    // id string -> lo genera mongo
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    nro: number;
}

export const PokemonSchema = SchemaFactory.createForClass ( Pokemon)
