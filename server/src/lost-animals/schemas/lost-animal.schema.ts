import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LostAnimalDocument = LostAnimal & Document;

@Schema()
export class LostAnimal {
    @Prop({ required: true })
    species: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    color: string;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true })
    gender: string;

    @Prop()
    distinctiveMarkings?: string;

    @Prop({ required: true })
    lat: number;

    @Prop({ required: true })
    lng: number;

    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    hour: string;
}

export const LostAnimalSchema = SchemaFactory.createForClass(LostAnimal);
