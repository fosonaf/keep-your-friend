import { Module } from '@nestjs/common';
import { cloudinaryProvider } from './cloudinary.provider';

@Module({
    providers: [cloudinaryProvider],
    exports: [cloudinaryProvider],
})
export class CloudinaryModule {}
