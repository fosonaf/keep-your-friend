import React, { useEffect, useRef } from 'react';
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
                                         date,
                                         hour,
                                         gender,
                                         color,
                                         distinctiveMarkings,
                                         lat,
                                         lng,
                                         closeModal
                                     }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Bloquer le scroll en arrière-plan quand la modal est ouverte
    useEffect(() => {
        // Désactiver le scroll en arrière-plan
        document.body.style.overflow = 'hidden';

        // Rétablir le scroll lorsque la modal est fermée
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Fermer avec la touche "Escape"
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeModal]);

    // Fermer quand on clique à l'extérieur de la modal
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModal();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" ref={modalRef}>
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
                        <p><strong>Photo prise le :</strong> {date} à {hour}</p>
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
