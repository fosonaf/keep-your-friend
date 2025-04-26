import Filters from '../components/Filters';
import AnimalCard from '../components/AnimalCard';
import Modal from '../components/Modal';
import { lostAnimals, LostAnimal } from '../data/lostAnimals';
import {useAnimalFilters} from "../hooks/useAnimalFilters";

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
        selectedAnimal,
        openModal,
        closeModal,
    } = useAnimalFilters();

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
