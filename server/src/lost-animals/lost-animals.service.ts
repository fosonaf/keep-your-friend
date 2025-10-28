import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LostAnimal, LostAnimalDocument } from './schemas/lost-animal.schema';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class LostAnimalsService {
    constructor(
        @InjectModel(LostAnimal.name) private lostAnimalModel: Model<LostAnimalDocument>,
        @Inject('CLOUDINARY') private cloudinaryClient: typeof cloudinary,
    ) {}

    async findAll() {
        return this.lostAnimalModel.find().exec();
    }

    private uploadBufferToCloudinary(buffer: Buffer, folder = 'kyf/animals') {
        return new Promise<any>((resolve, reject) => {
            const uploadStream = this.cloudinaryClient.uploader.upload_stream({ folder }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
            uploadStream.end(buffer);
        });
    }

    async createFromMultipart(fields: any, fileBuffer: Buffer) {
        const result = await this.uploadBufferToCloudinary(fileBuffer);

        const lostAnimal = new this.lostAnimalModel({
            species: fields.species,
            location: fields.location,
            color: fields.color,
            imageUrl: result.secure_url,
            gender: fields.gender,
            distinctiveMarkings: fields.distinctiveMarkings,
            lat: parseFloat(fields.lat),
            lng: parseFloat(fields.lng),
            date: fields.date,
            hour: fields.hour,
        });

        return lostAnimal.save();
    }
}
