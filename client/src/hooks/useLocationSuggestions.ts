import { useState, useEffect } from 'react';

export function useLocationSuggestions(query: string, enable: boolean = true) {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (!query || !enable) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
                );
                const data = await response.json();

                if (data.length > 0) {
                    setSuggestions(data.map((item: any) => item.display_name));
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Erreur de récupération des suggestions', error);
                setSuggestions([]);
            }
        }, 300); // debounce

        return () => clearTimeout(timer);
    }, [query]);

    return suggestions;
}
