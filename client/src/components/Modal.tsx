import React from 'react';
import '../styles/modal.css';

type ModalProps = {
    imageUrl: string;
    species: string;
    location: string;
    gender: string;
    color: string;
    distinctiveMarkings: string;
    closeModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ imageUrl, species, location, gender, color, distinctiveMarkings, closeModal }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-left">
                    {/* Partie gauche vide */}
                </div>
                <div className="modal-right">
                    {/* Image */}
                    <img src={imageUrl} alt={species} />
                    {/* Informations sous l'image */}
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
