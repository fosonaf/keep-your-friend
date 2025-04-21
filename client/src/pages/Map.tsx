import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { lostAnimals } from '../data/lostAnimals'

// Fix des icônes manquantes
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

function MapPage() {
    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <MapContainer center={[48.8566, 2.3522]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {lostAnimals.map((animal, index) => (
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
    )
}

export default MapPage
