import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LostAnimalsModule } from './lost-animals/lost-animals.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/kyf'),
        LostAnimalsModule,
    ],
})
export class AppModule {}
