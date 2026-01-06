import { useState, useEffect } from 'react';

type GoogleAutocompletePrediction = {
    description: string;
};

export function useLocationSuggestions(query: string, enable: boolean = true) {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (!query || !enable) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

            if (!apiKey) {
                console.error('VITE_GOOGLE_MAPS_API_KEY est manquant pour les suggestions de lieu.');
                setSuggestions([]);
                return;
            }

            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
                        query
                    )}&types=(cities)&language=fr&key=${apiKey}`
                );
                const data = await response.json();

                if (data.status === 'OK' && Array.isArray(data.predictions)) {
                    setSuggestions(
                        (data.predictions as GoogleAutocompletePrediction[]).map(
                            (p) => p.description
                        )
                    );
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Erreur de récupération des suggestions Google Places', error);
                setSuggestions([]);
            }
        }, 300); // debounce

        return () => clearTimeout(timer);
    }, [query, enable]);

    return suggestions;
}
