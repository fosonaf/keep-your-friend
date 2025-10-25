import mongoose from 'mongoose';

const lostAnimalSchema = new mongoose.Schema({
    species: {
        type: String,
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
        required: true
    },
    distinctiveMarkings: {
        type: String,
        required: false
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
