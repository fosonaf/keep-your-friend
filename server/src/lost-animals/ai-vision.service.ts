import { Injectable, Logger } from '@nestjs/common';
import { HfInference } from '@huggingface/inference';
import { ConfigService } from '@nestjs/config';

export interface AnimalValidationResult {
    isValid: boolean;
    species?: string;
    confidence?: number;
    message: string;
    reason?: 'no_animal' | 'low_confidence' | 'unclear';
}

@Injectable()
export class AiVisionService {
    private readonly logger = new Logger(AiVisionService.name);
    private hf: HfInference;

    constructor(private configService: ConfigService) {
        // TODO config
        const token = this.configService.get<string>('HUGGING_FACE_TOKEN');
        if (!token) {
            this.logger.error('HUGGING_FACE_TOKEN manquant dans .env');
            throw new Error('Configuration Hugging Face manquante');
        }
        this.hf = new HfInference(token);
    }

    async validateAnimalImage(imageBuffer: Buffer): Promise<AnimalValidationResult> {
        try {
            this.logger.log('Analyse de l\'image par Hugging Face...');

            const token = this.configService.get<string>('HUGGING_FACE_TOKEN');

            // 🔧 Convertir le buffer en base64
            const base64Image = imageBuffer.toString('base64');

            const response = await fetch(
                'https://api-inference.huggingface.co/models/microsoft/resnet-50',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', // 👈 Ajouté
                    },
                    body: JSON.stringify({
                        inputs: base64Image, // 👈 En base64, pas en Buffer brut
                    }),
                }
            );

            if (!response.ok) {
                const error = await response.text();
                this.logger.error(`Erreur API HF: ${response.status} - ${error}`);
                throw new Error(`Hugging Face API error: ${response.status}`);
            }

            const result = await response.json();

            this.logger.log(`Top 3 prédictions: ${JSON.stringify(result.slice(0, 3))}`);

            const animalKeywords = [
                'cat', 'dog', 'bird', 'tiger', 'lion', 'bear', 'elephant',
                'horse', 'cow', 'sheep', 'pig', 'chicken', 'duck', 'goose',
                'rabbit', 'hamster', 'fox', 'wolf', 'deer', 'zebra',
                'giraffe', 'monkey', 'ape', 'snake', 'lizard', 'turtle',
                'frog', 'fish', 'shark', 'whale', 'dolphin', 'seal',
                'eagle', 'owl', 'parrot', 'penguin', 'flamingo',
                'mouse', 'rat', 'squirrel', 'hedgehog', 'bat'
            ];

            const animalDetection = result.find(prediction => {
                const label = prediction.label.toLowerCase();
                return animalKeywords.some(keyword => label.includes(keyword));
            });

            if (!animalDetection) {
                return {
                    isValid: false,
                    message: "Aucun animal détecté sur la photo. Assurez-vous que l'animal est bien visible 🔍",
                    reason: 'no_animal'
                };
            }

            if (animalDetection.score < 0.3) {
                return {
                    isValid: false,
                    species: animalDetection.label,
                    confidence: Math.round(animalDetection.score * 100),
                    message: "L'image n'est pas assez claire. Essayez de prendre une meilleure photo 📸",
                    reason: 'low_confidence'
                };
            }

            return {
                isValid: true,
                species: this.translateSpecies(animalDetection.label),
                confidence: Math.round(animalDetection.score * 100),
                message: `${this.translateSpecies(animalDetection.label)} détecté avec ${Math.round(animalDetection.score * 100)}% de confiance ✅`
            };

        } catch (error) {
            this.logger.error('Erreur lors de l\'analyse Hugging Face:', error);
            throw new Error('Impossible d\'analyser l\'image');
        }
    }

    /**
     * Traduit les labels anglais en français (basique)
     */
    private translateSpecies(label: string): string {
        const translations: Record<string, string> = {
            // Chiens
            'golden_retriever': 'Golden Retriever',
            'german_shepherd': 'Berger Allemand',
            'labrador_retriever': 'Labrador',
            'beagle': 'Beagle',
            'bulldog': 'Bouledogue',
            'pug': 'Carlin',
            'chihuahua': 'Chihuahua',
            'poodle': 'Caniche',
            'husky': 'Husky',

            // Chats
            'tabby_cat': 'Chat tigré',
            'tiger_cat': 'Chat tigré',
            'persian_cat': 'Chat persan',
            'siamese_cat': 'Chat siamois',
            'egyptian_cat': 'Chat égyptien',

            // Oiseaux communs
            'robin': 'Rouge-gorge',
            'jay': 'Geai',
            'magpie': 'Pie',
            'sparrow': 'Moineau',
            'crow': 'Corbeau',
            'owl': 'Hibou',
            'eagle': 'Aigle',
            'parrot': 'Perroquet',
            'flamingo': 'Flamant rose',
            'penguin': 'Pingouin',

            // Animaux de ferme
            'cow': 'Vache',
            'pig': 'Cochon',
            'sheep': 'Mouton',
            'goat': 'Chèvre',
            'horse': 'Cheval',
            'chicken': 'Poule',
            'duck': 'Canard',
            'goose': 'Oie',

            // Sauvages
            'lion': 'Lion',
            'tiger': 'Tigre',
            'bear': 'Ours',
            'wolf': 'Loup',
            'fox': 'Renard',
            'deer': 'Cerf',
            'elephant': 'Éléphant',
            'giraffe': 'Girafe',
            'zebra': 'Zèbre',
            'monkey': 'Singe',

            // Reptiles
            'snake': 'Serpent',
            'lizard': 'Lézard',
            'turtle': 'Tortue',
            'crocodile': 'Crocodile',

            // Rongeurs
            'rabbit': 'Lapin',
            'hamster': 'Hamster',
            'mouse': 'Souris',
            'squirrel': 'Écureuil',
            'hedgehog': 'Hérisson',

            // Aquatiques
            'goldfish': 'Poisson rouge',
            'shark': 'Requin',
            'whale': 'Baleine',
            'dolphin': 'Dauphin',
        };

        const lowerLabel = label.toLowerCase().replace(/_/g, '_');
        return translations[lowerLabel] || label.replace(/_/g, ' ');
    }
}