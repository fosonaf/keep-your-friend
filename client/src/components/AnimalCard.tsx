// src/components/AnimalCard.tsx
import React from 'react';
import '../styles/animalCard.css';

type AnimalCardProps = {
    species: string;
    location: string;
    imageUrl: string;
    gender: 'Male' | 'Female';
    distinctiveMarkings: string;
    color: string;
    onClick: () => void; // Ajout du onClick pour gérer l'ouverture de la modal
};

const AnimalCard: React.FC<AnimalCardProps> = ({
                                                   species,
                                                   location,
                                                   imageUrl,
                                                   gender,
                                                   distinctiveMarkings,
                                                   color,
                                                   onClick,
                                               }) => {
    return (
        <div className="animal-card" onClick={onClick}>
            <img src={imageUrl} alt={species} style={{ width: '100%', borderRadius: '5px' }} />
            <span className="animal-species">{species}</span>
            <p>{location}</p>
            <p><strong>Couleur :</strong> {color}</p>
            <p><strong>Sexe :</strong> {gender}</p>
            <p><strong>Signe distinctif :</strong> {distinctiveMarkings}</p>
        </div>
    );
};

export default AnimalCard;
