import { Controller, Get, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { LostAnimalsService } from './lost-animals.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AiVisionService } from "./ai-vision.service";

@Controller('lost-animals')
export class LostAnimalsController {
    constructor(
        private readonly lostAnimalsService: LostAnimalsService,
        private readonly aiVisionService: AiVisionService,
    ) {}

    @Get()
    async findAll(@Res() res: FastifyReply) {
        const animals = await this.lostAnimalsService.findAll();
        return res.status(HttpStatus.OK).send(animals);
    }

    @Post()
    async createMultipart(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        try {
            const parts = req.parts();
            const fields: Record<string, string> = {};
            let fileBuffer: Buffer | null = null;

            for await (const part of parts) {
                if (part.type === 'file') {
                    const chunks: Buffer[] = [];
                    for await (const chunk of part.file) {
                        chunks.push(chunk);
                    }
                    if (part.fieldname === 'image') {
                        fileBuffer = Buffer.concat(chunks);
                    }
                } else {
                    fields[part.fieldname] = part.value as string;
                }
            }

            if (!fileBuffer) {
                return res.status(400).send({ message: 'Aucune image fournie' });
            }

            console.log('Fields reçus:', fields);
            console.log('Taille du fichier:', fileBuffer.length);

            const created = await this.lostAnimalsService.createFromMultipart(fields, fileBuffer);
            return res.status(201).send(created);
        } catch (error) {
            console.error('Erreur lors du traitement multipart:', error);
            return res.status(500).send({ message: 'Erreur serveur', error: error.message });
        }
    }

    @Post('validate')
    async validateAnimal(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        try {
            const data = await req.file();

            if (!data) {
                return res.status(400).send({ message: 'Aucune image fournie' });
            }

            const fileBuffer = await data.toBuffer();

            console.log('Nom du fichier:', data.filename);
            console.log('Type MIME:', data.mimetype);
            console.log('Taille du fichier:', fileBuffer.length);

            // Appel à Hugging Face pour validation
            const validation = await this.aiVisionService.validateAnimalImage(fileBuffer);
            // const validation = await this.lostAnimalsService.validateAnimalImage(fileBuffer);

            throw new Error('Not implemented yet');
            /*return res.status(200).send({
                message: 'Image reçue avec succès',
                filename: data.filename,
                size: fileBuffer.length,
                mimetype: data.mimetype
            });*/

        } catch (error) {
            console.error('Erreur lors de la validation:', error);
            return res.status(500).send({
                message: 'Erreur serveur',
                error: error.message
            });
        }
    }
}