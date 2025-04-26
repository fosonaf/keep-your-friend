import { useState } from 'react'
import { lostAnimals, LostAnimal } from '../data/lostAnimals'

export function useAnimalFilters() {
    const [speciesFilter, setSpeciesFilter] = useState<string>('');
    const [genderFilter, setGenderFilter] = useState<'Male' | 'Female' | ''>('');
    const [colorFilter, setColorFilter] = useState<string>('');
    const [locationFilter, setLocationFilter] = useState<string>('');

    const filteredAnimals = lostAnimals.filter((animal) => {
        const matchesSpecies = speciesFilter ? animal.species.toLowerCase().includes(speciesFilter.toLowerCase()) : true;
        const matchesGender = genderFilter ? animal.gender === genderFilter : true;
        const matchesColor = colorFilter ? animal.color.toLowerCase().includes(colorFilter.toLowerCase()) : true;

        return matchesSpecies && matchesGender && matchesColor;
    });

    return {
        speciesFilter,
        setSpeciesFilter,
        genderFilter,
        setGenderFilter,
        colorFilter,
        setColorFilter,
        locationFilter,
        setLocationFilter,
        filteredAnimals,
    }
}
