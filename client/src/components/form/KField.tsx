import React, {useState} from 'react';
import './KField.css'
import {useLocationSuggestions} from "../../hooks/useLocationSuggestions.ts";

interface KFieldProps {
    placeholder: string;
    inputValue: string;
    label: string
    setInputValue: (value: string) => void;
    autocompleteLocation?: boolean;
}

const KField: React.FC<KFieldProps> = ({
                                           placeholder,
                                           label,
                                           inputValue,
                                           setInputValue,
                                           autocompleteLocation = false
                                         }) => {

    const locationSuggestions = useLocationSuggestions(inputValue, autocompleteLocation);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [selectedPosition, setSelectedPosition] = useState('');

    const handleLocationSelect = async (location: string) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                setInputValue([parseFloat(lat), parseFloat(lon)]);
                setSelectedPosition(inputValue);
            }
        } catch (error) {
            console.error('Erreur lors du géocodage :', error);
        }
    };

    const handleSelectSuggestion = async (suggestion: string) => {
        setInputValue(suggestion);
        await handleLocationSelect(suggestion);
        setShowSuggestions(false);
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (locationSuggestions.length > 0) {
                e.preventDefault();
                await handleSelectSuggestion(locationSuggestions[0]);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <div className="kds-field">
            <label
                htmlFor={label}
                className="label-field"
            >
                {label}
            </label>
            <div className="input-wrapper">
                {
                    autocompleteLocation ? (
                        <>
                            <input
                                type="text"
                                placeholder="Rechercher une ville"
                                className="kds-input"
                                value={selectedPosition.length ? selectedPosition : inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onKeyDown={handleKeyDown}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                                onFocus={() => setShowSuggestions(true)}
                                style={{paddingRight: '1.5rem'}}
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
                                                padding: '0.5rem',
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
                            id={label}
                            type="text"
                            placeholder={placeholder}
                            className="kds-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    )
                }
                {inputValue && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '55%',
                            right: '0.5rem',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                        onClick={() => {
                            setInputValue('');
                            setSelectedPosition('');
                        }}
                    >
                    ×
                </span>
                )}
            </div>
        </div>
    );
};

export default KField;
