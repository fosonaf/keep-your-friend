import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    app.enableCors();

    await app.listen(process.env.PORT || 5000, '0.0.0.0');
    console.log(`🚀 Serveur lancé sur http://localhost:${process.env.PORT || 5000}`);
}
bootstrap();