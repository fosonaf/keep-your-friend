import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import Filters from '../components/Filters';
import { useAnimalFilters } from '../hooks/useAnimalFilters';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Composant pour bouger la carte
function MapUpdater({ position }: { position: [number, number] | null }) {
    const map = useMap();
    if (position) {
        map.setView(position, 13); // Zoom 13
    }
    return null;
}

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

    const handleLocationSelect = async (location: string) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                setSelectedPosition([parseFloat(lat), parseFloat(lon)]);
            }
        } catch (error) {
            console.error('Erreur lors du géocodage :', error);
        }
    };

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

            <MapContainer
                center={[48.8566, 2.3522]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {selectedPosition && <MapUpdater position={selectedPosition} />}

                {filteredAnimals.map((animal, index) => (
                    <Marker key={index} position={[animal.lat, animal.lng]}>
                        <Popup>
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
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapPage;
