import express from 'express';
import multer from 'multer';
import LostAnimal from '../models/LostAnimal';

const router = express.Router();
import cloudinary from '../assets/cloudinary';
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req: any, res: any) => {
    try {
        const { species, location, color, image, gender, distinctiveMarkings, lat, lng, date, hour } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Image manquante' });
        }

        if (!file) {
            res.status(400).json({message: 'Image manquante'})
            throw new Error('Image manquante');
        }

        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'kyf/animals',
        });

        const lostAnimal = new LostAnimal({
            species,
            location,
            color,
            imageUrl: result.secure_url,
            gender,
            distinctiveMarkings,
            lat,
            lng,
            date,
            hour
        });

        await lostAnimal.save();
        res.status(201).json(lostAnimal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'animal perdu' });
    }
});

router.get('/', async (req, res) => {
    try {
        const lostAnimals = await LostAnimal.find();
        res.status(200).json(lostAnimals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des animaux perdus' });
    }
});

export default router;
