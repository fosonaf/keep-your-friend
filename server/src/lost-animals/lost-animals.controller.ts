import { Controller, Get, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { LostAnimalsService } from './lost-animals.service';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller('lost-animals')
export class LostAnimalsController {
    constructor(private readonly lostAnimalsService: LostAnimalsService) {}

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
                    // C'est un fichier
                    const chunks: Buffer[] = [];
                    for await (const chunk of part.file) {
                        chunks.push(chunk);
                    }
                    if (part.fieldname === 'image') {
                        fileBuffer = Buffer.concat(chunks);
                    }
                } else {
                    // C'est un champ texte
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

                    // fields[part.fieldname] = part.value as string;
                }
            }

            if (!fileBuffer) {
                return res.status(400).send({ message: 'Aucune image fournie' });
            }

            console.log('Fields reçus:', fields);
            console.log('Taille du fichier:', fileBuffer.length);

            //const created = await this.lostAnimalsService.createFromMultipart(fields, fileBuffer);
            //return res.status(201).send(created);
            throw new Error('Not implemented yet');
        } catch (error) {
            console.error('Erreur lors du traitement multipart:', error);
            return res.status(500).send({ message: 'Erreur serveur', error: error.message });
        }
    }
}