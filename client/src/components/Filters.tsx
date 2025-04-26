import React, { useState } from 'react';
import { useLocationSuggestions } from '../hooks/useLocationSuggestions';

interface FiltersProps {
    speciesFilter: string;
    genderFilter: '' | 'Male' | 'Female';
    colorFilter: string;
    locationFilter: string;
    setSpeciesFilter: (value: string) => void;
    setGenderFilter: (value: '' | 'Male' | 'Female') => void;
    setColorFilter: (value: string) => void;
    setLocationFilter: (value: string) => void;
    autocompleteLocation?: boolean;
    onLocationSelect?: (location: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
                                             speciesFilter,
                                             genderFilter,
                                             colorFilter,
                                             locationFilter,
                                             setSpeciesFilter,
                                             setGenderFilter,
                                             setColorFilter,
                                             setLocationFilter,
                                             autocompleteLocation = false,
                                             onLocationSelect,
                                         }) => {
    const locationSuggestions = useLocationSuggestions(locationFilter);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const handleSelectSuggestion = (suggestion: string) => {
        setLocationFilter(suggestion);
        if (onLocationSelect) {
            onLocationSelect(suggestion);
        }
        setShowSuggestions(false); // fermer suggestions après sélection
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (locationSuggestions.length > 0) {
                e.preventDefault(); // empêcher le submit si jamais
                handleSelectSuggestion(locationSuggestions[0]);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <div className="filters">
            {/* Espèce */}
            <select
                className="select-filter"
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
            >
                <option value="">Filtrer par espèce</option>
                <option value="Chat">Chat</option>
                <option value="Chien">Chien</option>
                <option value="Autre">Autre</option>
            </select>

            {/* Sexe */}
            <select
                className="select-filter"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value as 'Male' | 'Female')}
            >
                <option value="">Filtrer par sexe</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            {/* Couleur */}
            <input
                type="text"
                placeholder="Filtrer par couleur"
                className="input-filter"
                value={colorFilter}
                onChange={(e) => setColorFilter(e.target.value)}
            />

            {/* Ville */}
            {autocompleteLocation ? (
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Rechercher une ville"
                        className="input-filter"
                        value={locationFilter}
                        onChange={(e) => {
                            setLocationFilter(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onKeyDown={handleKeyDown}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // pour laisser le temps au clic
                        onFocus={() => setShowSuggestions(true)}
                    />
                    {showSuggestions && locationSuggestions.length > 0 && (
                        <ul style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'white',
                            border: '1px solid #ccc',
                            borderTop: 'none',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            zIndex: 1000,
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                        }}>
                            {locationSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    style={{
                                        padding: '8px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #eee',
                                    }}
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : (
                <input
                    type="text"
                    placeholder="Filtrer par ville"
                    className="input-filter"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                />
            )}
        </div>
    );
};

export default Filters;
