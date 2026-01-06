import React, { useEffect, useRef, useMemo } from 'react';
import '../styles/modal.css';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

type ModalProps = {
    imageUrl: string;
    species: string;
    location: string;
    date: string;
    hour: string;
    gender: string;
    color: string;
    distinctiveMarkings: string;
    lat: number;
    lng: number;
    closeModal: () => void;
};

const mapContainerStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
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

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeModal]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModal();
        }
    };

    const center = useMemo(
        () => ({ lat, lng }),
        [lat, lng]
    );

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places'],
    });

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" ref={modalRef}>
                <div className="modal-left">
                    {!isLoaded ? (
                        <div>Chargement de la carte...</div>
                    ) : (
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center}
                            zoom={13}
                        >
                            <Marker position={center}>
                                <InfoWindow position={center}>
                                    <div>
                                        <strong>{species}</strong>
                                        <br />
                                        Vu à {location}
                                    </div>
                                </InfoWindow>
                            </Marker>
                        </GoogleMap>
                    )}
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
