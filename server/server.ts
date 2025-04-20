import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import lostAnimalsRoutes from './routes/lostAnimals';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI as string;

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connecté à MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Erreur de connexion à MongoDB :', error);
    });

// Utilisation des routes pour les animaux perdus
app.use('/lost-animals', lostAnimalsRoutes);

// Route de test pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
    res.send('Bienvenue sur Keep Your Friend API 🐾');
});
