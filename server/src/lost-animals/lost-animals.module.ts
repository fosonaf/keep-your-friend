import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LostAnimal, LostAnimalSchema } from './schemas/lost-animal.schema';
import { LostAnimalsController } from './lost-animals.controller';
import { LostAnimalsService } from './lost-animals.service';
import { CloudinaryModule } from '../common/cloudinary.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: LostAnimal.name, schema: LostAnimalSchema }]),
        CloudinaryModule,
    ],
    controllers: [LostAnimalsController],
    providers: [LostAnimalsService],
})
export class LostAnimalsModule {}
