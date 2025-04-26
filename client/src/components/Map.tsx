import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LostAnimal } from '../data/lostAnimals'

type Props = {
    animals: LostAnimal[]
}

const Map = ({ animals }: Props) => {
    const center = animals.length
        ? [animals[0].lat, animals[0].lng]
        : [48.8566, 2.3522] // Default to Paris

    return (
        <MapContainer center={center} zoom={6} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {animals.map((animal, index) => (
                <Marker key={index} position={[animal.lat, animal.lng]}>
                    <Popup>
                        <strong>{animal.species}</strong><br />
                        {animal.color} - {animal.gender}<br />
                        {animal.distinctiveMarkings}<br />
                        Vu à : {animal.location}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default Map
