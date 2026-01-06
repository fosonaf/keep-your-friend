import { useMemo, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import Filters from '../components/Filters';
import { useAnimalFilters } from '../hooks/useAnimalFilters';
import { geocodeLocation } from '../utils/geocodeLocation';
import Modal from '../components/Modal';
import { LostAnimal } from '../types/lostAnimals.ts';

const containerStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
};

function MapPage() {
    const {
        speciesFilter,
        genderFilter,
        colorFilter,
        locationFilter,
        setSpeciesFilter,
        setGenderFilter,
        setColorFilter,
        setLocationFilter,
        filteredAnimals,
    } = useAnimalFilters();

    const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);
    const [selectedAnimal, setSelectedAnimal] = useState<LostAnimal | null>(null);

    const handleLocationSelect = async (location: string) => {
        try {
            const coords = await geocodeLocation(location);
            if (coords) {
                setSelectedPosition(coords);
            }
        } catch (error) {
            console.error('Erreur lors du géocodage :', error);
        }
    };

    const openModal = (animal: LostAnimal) => {
        setSelectedAnimal(animal);
    };

    const closeModal = () => {
        setSelectedAnimal(null);
    };

    const mapCenter = useMemo(
        () =>
            selectedPosition
                ? { lat: selectedPosition[0], lng: selectedPosition[1] }
                : { lat: 48.8566, lng: 2.3522 },
        [selectedPosition]
    );

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places'],
    });

    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <Filters
                speciesFilter={speciesFilter}
                genderFilter={genderFilter}
                colorFilter={colorFilter}
                locationFilter={locationFilter}
                setSpeciesFilter={setSpeciesFilter}
                setGenderFilter={setGenderFilter}
                setColorFilter={setColorFilter}
                setLocationFilter={setLocationFilter}
                autocompleteLocation
                enableLocationSuggestions={isLoaded}
                onLocationSelect={handleLocationSelect}
            />

            {!isLoaded ? (
                <div>Chargement de la carte...</div>
            ) : (
                <>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={mapCenter}
                        zoom={13}
                    >
                        {filteredAnimals.map((animal, index) => (
                            <Marker
                                key={index}
                                position={{ lat: animal.lat, lng: animal.lng }}
                                onClick={() => setSelectedMarkerIndex(index)}
                            >
                                {selectedMarkerIndex === index && (
                                    <InfoWindow
                                        position={{ lat: animal.lat, lng: animal.lng }}
                                        onCloseClick={() => setSelectedMarkerIndex(null)}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                maxWidth: '220px',
                                                padding: '8px 10px',
                                                borderRadius: '8px',
                                                color: '#000',
                                            }}
                                        >
                                            <img
                                                src={animal.imageUrl}
                                                alt={animal.species}
                                                width="100"
                                                height="100"
                                                style={{ borderRadius: '8px', objectFit: 'cover', marginBottom: '6px' }}
                                            />
                                            <p><strong>Espèce :</strong> {animal.species}</p>
                                            <p><strong>Sexe :</strong> {animal.gender}</p>
                                            <p><strong>Couleur :</strong> {animal.color}</p>
                                            <p><strong>Lieu :</strong> {animal.location}</p>
                                            <button
                                                style={{
                                                    marginTop: '6px',
                                                    padding: '6px 10px',
                                                    backgroundColor: '#ff6f00',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => openModal(animal)}
                                            >
                                                Plus d'infos
                                            </button>
                                        </div>
                                    </InfoWindow>
                                )}
                            </Marker>
                        ))}
                    </GoogleMap>

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
                </>
            )}
        </div>
    );
}

export default MapPage;
