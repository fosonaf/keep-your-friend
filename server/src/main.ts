import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
    const fastifyAdapter = new FastifyAdapter({ logger: true });

    await fastifyAdapter.getInstance().register(fastifyMultipart, {
        limits: {
            fileSize: 10 * 1024 * 1024, // max 10MB
            files: 1 // limiter à 1 fichier
        },
    });

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        fastifyAdapter
    );

    await app.register(helmet as any, {
        contentSecurityPolicy: false,
    });

    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });

    const port = process.env.PORT || 5000;
    await app.listen(Number(port), '0.0.0.0');
    console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
}

bootstrap();
