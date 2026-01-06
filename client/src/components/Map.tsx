import { useMemo, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { LostAnimal } from '../types/lostAnimals';

type Props = {
    animals: LostAnimal[];
};

const containerStyle: React.CSSProperties = {
    height: '400px',
    width: '100%',
};

const Map = ({ animals }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const center = useMemo(
        () =>
            animals.length
                ? { lat: animals[0].lat, lng: animals[0].lng }
                : { lat: 48.8566, lng: 2.3522 }, // Paris par défaut
        [animals]
    );

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script-component',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });

    if (!isLoaded) {
        return <div>Chargement de la carte...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
        >
            {animals.map((animal, index) => (
                <Marker
                    key={index}
                    position={{ lat: animal.lat, lng: animal.lng }}
                    onClick={() => setSelectedIndex(index)}
                >
                    {selectedIndex === index && (
                        <InfoWindow
                            position={{ lat: animal.lat, lng: animal.lng }}
                            onCloseClick={() => setSelectedIndex(null)}
                        >
                            <div>
                                <strong>{animal.species}</strong>
                                <br />
                                {animal.color} - {animal.gender}
                                <br />
                                {animal.distinctiveMarkings}
                                <br />
                                Vu à : {animal.location}
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            ))}
        </GoogleMap>
    );
};

export default Map;
