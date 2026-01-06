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
    enableLocationSuggestions?: boolean;
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
            enableLocationSuggestions = true,
            onLocationSelect,
                                         }) => {
    const locationSuggestions = useLocationSuggestions(locationFilter, enableLocationSuggestions);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const handleSelectSuggestion = (suggestion: string) => {
        setLocationFilter(suggestion);
        if (onLocationSelect) {
            onLocationSelect(suggestion);
        }
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (locationSuggestions.length > 0) {
                e.preventDefault();
                handleSelectSuggestion(locationSuggestions[0]);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <div className="filters">
            <div style={{ position: 'relative' }}>
                <select
                    className="select-filter"
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                    style={{ paddingRight: speciesFilter ? '24px' : undefined }}
                >
                    <option value="">Filtrer par espèce</option>
                    <option value="Chat">Chat</option>
                    <option value="Chien">Chien</option>
                    <option value="Autre">Autre</option>
                </select>
                {speciesFilter && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '8px',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                        onClick={() => setSpeciesFilter('')}
                    >
                        ×
                    </span>
                )}
            </div>

            <div style={{ position: 'relative' }}>
                <select
                    className="select-filter"
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value as 'Male' | 'Female')}
                    style={{ paddingRight: genderFilter ? '24px' : undefined }}
                >
                    <option value="">Filtrer par sexe</option>
                    <option value="Male">Male</option>
                    <option value="Femelle">Femelle</option>
                    <option value="Inconnu">Inconnu</option>
                </select>
                {genderFilter && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '8px',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                        onClick={() => setGenderFilter('')}
                    >
                        ×
                    </span>
                )}
            </div>

            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Filtrer par couleur"
                    className="input-filter"
                    value={colorFilter}
                    onChange={(e) => setColorFilter(e.target.value)}
                    style={{ paddingRight: colorFilter ? '24px' : undefined }}
                />
                {colorFilter && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '8px',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                        onClick={() => setColorFilter('')}
                    >
                        ×
                    </span>
                )}
            </div>

            <div style={{ position: 'relative' }}>
                {autocompleteLocation ? (
                    <>
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
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                            onFocus={() => setShowSuggestions(true)}
                            style={{ paddingRight: locationFilter ? '24px' : undefined }}
                        />
                        {locationFilter && (
                            <span
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '8px',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                }}
                                onClick={() => setLocationFilter('')}
                            >
                                ×
                            </span>
                        )}
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
                    </>
                ) : (
                    <input
                        type="text"
                        placeholder="Filtrer par ville"
                        className="input-filter"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        style={{ paddingRight: locationFilter ? '24px' : undefined }}
                    />
                )}
            </div>
        </div>
    );
};

export default Filters;
