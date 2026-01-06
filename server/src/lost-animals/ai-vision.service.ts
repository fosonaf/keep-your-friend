import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface AnimalValidationResult {
    isValid: boolean;
    species?: string; // espèce (chien, chat, oiseau...)
    breed?: string;   // race si disponible (Labrador, Siamois...)
    colors?: string[]; // couleurs dominantes
    confidence?: number;
    message: string;
    reason?: 'no_animal' | 'low_confidence' | 'unclear';
}

interface VisionLabel {
    description: string;
    score: number;
}

interface VisionColor {
    color: { red: number; green: number; blue: number };
    score: number;
    pixelFraction: number;
}

@Injectable()
export class AiVisionService {
    private readonly logger = new Logger(AiVisionService.name);
    private readonly apiKey: string;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('CLOUD_VISION_API_KEY');
        if (!apiKey) {
            this.logger.error('CLOUD_VISION_API_KEY manquant dans .env');
            throw new Error('Configuration Google Cloud Vision manquante');
        }
        this.apiKey = apiKey;
    }

    async validateAnimalImage(imageBuffer: Buffer): Promise<AnimalValidationResult> {
        try {
            this.logger.log('Analyse de l\'image via Google Cloud Vision...');

            const base64Image = imageBuffer.toString('base64');

            const response = await fetch(
                `https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        requests: [
                            {
                                image: { content: base64Image },
                                features: [
                                    { type: 'LABEL_DETECTION', maxResults: 10 },
                                    { type: 'IMAGE_PROPERTIES', maxResults: 1 },
                                ],
                            },
                        ],
                    }),
                },
            );

            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`Erreur API Google Vision: ${response.status} - ${errorText}`);
                throw new Error(`Google Vision API error: ${response.status}`);
            }

            const json = await response.json();
            const visionResponse = json.responses?.[0];

            const labels: VisionLabel[] = visionResponse?.labelAnnotations || [];
            const colorsData: VisionColor[] =
                visionResponse?.imagePropertiesAnnotation?.dominantColors?.colors || [];

            if (!labels.length) {
                return {
                    isValid: false,
                    message:
                        "Aucun animal détecté sur la photo. Assurez-vous que l'animal est bien visible 🔍",
                    reason: 'no_animal',
                };
            }

            const animalKeywords = [
                'cat',
                'dog',
                'bird',
                'mammal',
                'animal',
                'pet',
                'feline',
                'canine',
                'horse',
                'cow',
                'sheep',
                'pig',
                'rabbit',
                'hamster',
                'fox',
                'wolf',
            ];

            const animalLabel =
                labels.find((label) =>
                    animalKeywords.some((keyword) =>
                        label.description.toLowerCase().includes(keyword),
                    ),
                ) || labels[0];

            const confidence = Math.round((animalLabel.score || 0) * 100);

            if (animalLabel.score < 0.3) {
                const { species } = this.extractSpeciesAndBreed(animalLabel.description);
                return {
                    isValid: false,
                    species,
                    confidence,
                    message:
                        "L'image n'est pas assez claire. Essayez de prendre une meilleure photo 📸",
                    reason: 'low_confidence',
                };
            }

            const { species, breed } = this.extractSpeciesAndBreed(animalLabel.description);
            const colors = this.extractColors(colorsData);

            this.logger.log('result : ', {
                isValid: true,
                species,
                breed,
                colors,
                confidence,
                message: `${species}${breed ? ` (${breed})` : ''} détecté avec ${confidence}% de confiance ✅`,
            });

            return {
                isValid: true,
                species,
                breed,
                colors,
                confidence,
                message: `${species}${breed ? ` (${breed})` : ''} détecté avec ${confidence}% de confiance ✅`,
            };
        } catch (error) {
            this.logger.error('Erreur lors de l\'analyse Google Vision:', error);
            throw new Error('Impossible d\'analyser l\'image');
        }
    }

    /**
     * Traduit / simplifie les labels Vision en espèce + race
     */
    private extractSpeciesAndBreed(label: string): { species: string; breed?: string } {
        const lower = label.toLowerCase();

        // Espèce générique
        if (lower.includes('cat') || lower.includes('feline')) {
            return { species: 'Chat', breed: this.translateSpecies(label) };
        }
        if (lower.includes('dog') || lower.includes('canine')) {
            return { species: 'Chien', breed: this.translateSpecies(label) };
        }
        if (lower.includes('bird')) {
            return { species: 'Oiseau', breed: this.translateSpecies(label) };
        }

        // Par défaut on renvoie le label traduit comme espèce
        const translated = this.translateSpecies(label);
        return { species: translated };
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

        const lowerLabel = label.toLowerCase().replace(/ /g, '_');
        return translations[lowerLabel] || label.replace(/_/g, ' ');
    }

    /**
     * Déduit des noms de couleurs simples à partir des couleurs dominantes RGB
     */
    private extractColors(colors: VisionColor[]): string[] {
        if (!colors || !colors.length) return [];

        const names = colors
            .sort((a, b) => b.pixelFraction - a.pixelFraction)
            .slice(0, 5)
            .map(({ color }) => this.rgbToColorName(color.red, color.green, color.blue));

        // Uniques, on enlève les "inconnue"
        return Array.from(new Set(names.filter((c) => c !== 'inconnue')));
    }

    private rgbToColorName(r = 0, g = 0, b = 0): string {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        // Noir / blanc / gris
        if (max < 40) return 'noir';
        if (min > 215) return 'blanc';
        if (max - min < 25) return 'gris';

        if (r > g && r > b) {
            // Plutôt marron / roux
            if (g > b) return 'marron';
            return 'roux';
        }
        if (g > r && g > b) return 'vert';
        if (b > r && b > g) return 'bleu';

        return 'inconnue';
    }
}