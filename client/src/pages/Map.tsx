import { useMemo, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import Filters from '../components/Filters';
import { useAnimalFilters } from '../hooks/useAnimalFilters';
import { geocodeLocation } from '../utils/geocodeLocation';

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

    const mapCenter = useMemo(
        () =>
            selectedPosition
                ? { lat: selectedPosition[0], lng: selectedPosition[1] }
                : { lat: 48.8566, lng: 2.3522 },
        [selectedPosition]
    );

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script-page',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
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
                onLocationSelect={handleLocationSelect}
            />

            {!isLoaded ? (
                <div>Chargement de la carte...</div>
            ) : (
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
                                    <div style={{ textAlign: 'center', maxWidth: '200px' }}>
                                        <img
                                            src={animal.imageUrl}
                                            alt={animal.species}
                                            width="100"
                                            height="100"
                                            style={{ borderRadius: '8px', objectFit: 'cover' }}
                                        />
                                        <p><strong>Espèce :</strong> {animal.species}</p>
                                        <p><strong>Sexe :</strong> {animal.gender}</p>
                                        <p><strong>Couleur :</strong> {animal.color}</p>
                                        <p><strong>Marques :</strong> {animal.distinctiveMarkings}</p>
                                        <p><strong>Lieu :</strong> {animal.location}</p>
                                        <p><strong>Date :</strong> {animal.date} à {animal.hour}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                </GoogleMap>
            )}
        </div>
    );
}

export default MapPage;
