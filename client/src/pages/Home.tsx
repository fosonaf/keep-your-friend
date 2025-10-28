import Filters from '../components/Filters';
import AnimalCard from '../components/AnimalCard';
import Modal from '../components/Modal';
import { useAnimalFilters } from "../hooks/useAnimalFilters";
import { LostAnimal } from "../types/lostAnimals.ts";
import { useState } from "react";

const Home = () => {
    const {
        speciesFilter,
        genderFilter,
        colorFilter,
        locationFilter,
        setSpeciesFilter,
        setGenderFilter,
        setColorFilter,
        filteredAnimals,
        setLocationFilter,
    } = useAnimalFilters();

    const [selectedAnimal, setSelectedAnimal] = useState<LostAnimal | undefined>(undefined);

    const openModal = (animal: LostAnimal) => {
        setSelectedAnimal(animal);
    }

    const closeModal = () => {
        setSelectedAnimal(undefined);
    }

    return (
        <div className="container">
            <Filters
                speciesFilter={speciesFilter}
                genderFilter={genderFilter}
                colorFilter={colorFilter}
                locationFilter={locationFilter}
                setSpeciesFilter={setSpeciesFilter}
                setGenderFilter={setGenderFilter}
                setColorFilter={setColorFilter}
                setLocationFilter={setLocationFilter}
            />

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
                        onClick={() => openModal(animal)}
                    />
                ))}
            </div>

            {selectedAnimal && (
                <Modal
                    imageUrl={selectedAnimal.imageUrl}
                    species={selectedAnimal.species}
                    location={selectedAnimal.location}
                    date={selectedAnimal.date}
                    hour={selectedAnimal.hour}
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
