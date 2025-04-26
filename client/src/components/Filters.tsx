import React from 'react';

interface FiltersProps {
    speciesFilter: string;
    genderFilter: '' | 'Male' | 'Female';
    colorFilter: string;
    locationFilter: string;
    setSpeciesFilter: (value: string) => void;
    setGenderFilter: (value: '' | 'Male' | 'Female') => void;
    setColorFilter: (value: string) => void;
    setLocationFilter: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
                                             speciesFilter,
                                             genderFilter,
                                             colorFilter,
                                             locationFilter,
                                             setSpeciesFilter,
                                             setGenderFilter,
                                             setColorFilter,
                                             setLocationFilter
                                         }) => {
    return (
        <div className="filters">
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

            <select
                className="select-filter"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value as 'Male' | 'Female')}
            >
                <option value="">Filtrer par sexe</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <input
                type="text"
                placeholder="Filtrer par couleur"
                className="input-filter"
                value={colorFilter}
                onChange={(e) => setColorFilter(e.target.value)}
            />

            <input
                type="text"
                placeholder="Filtrer par ville"
                className="input-filter"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
            />
        </div>
    );
};

export default Filters;
