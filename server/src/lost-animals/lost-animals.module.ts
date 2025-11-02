import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LostAnimal, LostAnimalSchema } from './schemas/lost-animal.schema';
import { LostAnimalsController } from './lost-animals.controller';
import { LostAnimalsService } from './lost-animals.service';
import { CloudinaryModule } from '../common/cloudinary.module';
import { AiVisionService } from './ai-vision.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: LostAnimal.name, schema: LostAnimalSchema }]),
        CloudinaryModule,
        ConfigModule
    ],
    controllers: [LostAnimalsController],
    providers: [LostAnimalsService, AiVisionService],
})
export class LostAnimalsModule {}
