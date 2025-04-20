import express from 'express';
import LostAnimal from '../models/LostAnimal';

const router = express.Router();

// Route pour ajouter un animal perdu
router.post('/', async (req, res) => {
    try {
        const { species, location, color, imageUrl, gender, distinctiveMarkings, lat, lng, date, hour } = req.body;

        const lostAnimal = new LostAnimal({
            species,
            location,
            color,
            imageUrl,
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
