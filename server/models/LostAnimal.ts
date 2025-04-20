import mongoose from 'mongoose';

const lostAnimalSchema = new mongoose.Schema({
    species: {
        type: String,
        enum: ['Chat', 'Chien', 'Autre'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    distinctiveMarkings: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    }
});

const LostAnimal = mongoose.model('LostAnimal', lostAnimalSchema);

export default LostAnimal;
