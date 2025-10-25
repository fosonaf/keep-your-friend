import {useEffect, useState} from 'react'
import { LostAnimal } from '../types/lostAnimals.ts'

export function useAnimalFilters() {
    const [speciesFilter, setSpeciesFilter] = useState<string>('');
    const [genderFilter, setGenderFilter] = useState<'Male' | 'Female' | ''>('');
    const [colorFilter, setColorFilter] = useState<string>('');
    const [locationFilter, setLocationFilter] = useState<string>('');

    const [lostAnimals, setLostAnimals] = useState<LostAnimal[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchAnimals() {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:5000/lost-animals/')
                if (!response.ok) {
                    throw new Error('Erreur serveur')
                }
                const data: LostAnimal[] = await response.json()
                setLostAnimals(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchAnimals()
    }, [])

    const filteredAnimals = lostAnimals.filter((animal) => {
        const matchesSpecies = speciesFilter ? animal.species.toLowerCase().includes(speciesFilter.toLowerCase()) : true;
        const matchesGender = genderFilter ? animal.gender === genderFilter : true;
        const matchesColor = colorFilter ? animal.color.toLowerCase().includes(colorFilter.toLowerCase()) : true;
        const matchesLocation = locationFilter ? locationFilter.toLowerCase().includes(animal.location.toLowerCase()) : true;

        return matchesSpecies && matchesGender && matchesColor && matchesLocation;
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
