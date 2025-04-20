import React from 'react';
import '../styles/animalCard.css'

type AnimalCardProps = {
    name: string;
    location: string;
    imageUrl: string;
    gender: 'Male' | 'Female';
    distinctiveMarkings: string;
    color: string;
};

const AnimalCard: React.FC<AnimalCardProps> = ({
                                                   species,
                                                   location,
                                                   imageUrl,
                                                   gender,
                                                   distinctiveMarkings,
                                                   color,
                                               }) => {
    return (
        <div className="animal-card">
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
