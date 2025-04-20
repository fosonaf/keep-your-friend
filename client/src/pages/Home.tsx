import React, { useState } from 'react';
import AnimalCard from '../components/AnimalCard';
import Modal from '../components/Modal'; // Importer la Modal
import { lostAnimals, LostAnimal } from '../data/lostAnimals';

const Home = () => {
    const [speciesFilter, setSpeciesFilter] = useState<string>('');
    const [genderFilter, setGenderFilter] = useState<'Male' | 'Female' | ''>('');
    const [colorFilter, setColorFilter] = useState<string>('');
    const [locationFilter, setLocationFilter] = useState<string>('');

    // Etat pour gérer l'affichage de la modal
    const [selectedAnimal, setSelectedAnimal] = useState<LostAnimal | null>(null);

    // Fonction de filtrage des animaux
    const filteredAnimals = lostAnimals.filter((animal) => {
        const matchesSpecies = speciesFilter ? animal.species.toLowerCase().includes(speciesFilter.toLowerCase()) : true;
        const matchesGender = genderFilter ? animal.gender === genderFilter : true;
        const matchesColor = colorFilter ? animal.color.toLowerCase().includes(colorFilter.toLowerCase()) : true;
        const matchesLocation = locationFilter ? animal.location.toLowerCase().includes(locationFilter.toLowerCase()) : true;

        return matchesSpecies && matchesGender && matchesColor && matchesLocation;
    });

    // Fonction pour ouvrir la modal avec les détails de l'animal
    const openModal = (animal: LostAnimal) => {
        setSelectedAnimal(animal);
    };

    // Fonction pour fermer la modal
    const closeModal = () => {
        setSelectedAnimal(null);
    };

    return (
        <div className="container">
            <div className="filters">
                <select
                    className='select-filter'
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                >
                    <option value="">Filtrer par espèce</option>
                    <option value="Chat">Chat</option>
                    <option value="Chien">Chien</option>
                    <option value="Autre">Autre</option>
                </select>
                <select
                    className='select-filter'
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value as 'Male' | 'Female')}
                >
                    <option value="">Filtrer par sexe</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="text"
                    placeholder="Filtrer par couleur"
                    className="input-filter"
                    value={colorFilter}
                    onChange={(e) => setColorFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filtrer par ville"
                    className="input-filter"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                />
            </div>

            <div className="animal-list">
                {filteredAnimals.map((animal, index) => (
                    <AnimalCard
                        key={index}
                        species={animal.species}
                        location={animal.location}
                        color={animal.color}
                        imageUrl={animal.imageUrl}
                        gender={animal.gender}
                        distinctiveMarkings={animal.distinctiveMarkings}
                        onClick={() => openModal(animal)} // Passer l'animal à la fonction openModal
                    />
                ))}
            </div>

            {selectedAnimal && (
                <Modal
                    imageUrl={selectedAnimal.imageUrl}
                    species={selectedAnimal.species}
                    location={selectedAnimal.location}
                    gender={selectedAnimal.gender}
                    color={selectedAnimal.color}
                    distinctiveMarkings={selectedAnimal.distinctiveMarkings}
                    lat={selectedAnimal.lat}
                    lng={selectedAnimal.lng}
                    closeModal={closeModal}
                />
            )}

        </div>
    );
};

export default Home;
