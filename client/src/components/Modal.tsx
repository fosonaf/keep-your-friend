// Modal.tsx
import React from 'react';
import '../styles/modal.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type ModalProps = {
    imageUrl: string;
    species: string;
    location: string;
    gender: string;
    color: string;
    distinctiveMarkings: string;
    lat: number;
    lng: number;
    closeModal: () => void;
};

const Modal: React.FC<ModalProps> = ({
                                         imageUrl,
                                         species,
                                         location,
                                         gender,
                                         color,
                                         distinctiveMarkings,
                                         lat,
                                         lng,
                                         closeModal
                                     }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-left">
                    <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[lat, lng]}>
                            <Popup>
                                <strong>{species}</strong><br />
                                Vu à {location}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div className="modal-right">
                    <img src={imageUrl} alt={species} />
                    <div className="modal-info">
                        <h3>{species}</h3>
                        <p><strong>Lieu : </strong>{location}</p>
                        <p><strong>Sexe : </strong>{gender}</p>
                        <p><strong>Couleur : </strong>{color}</p>
                        <p><strong>Signe distinctif : </strong>{distinctiveMarkings}</p>
                    </div>
                </div>
                <button className="close-btn" onClick={closeModal}>X</button>
            </div>
        </div>
    );
};

export default Modal;
