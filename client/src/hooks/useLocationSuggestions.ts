import { useState, useEffect } from 'react';

declare const google: any;

export function useLocationSuggestions(query: string, enable: boolean = true) {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (!query || !enable) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(() => {
            if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
                setSuggestions([]);
                return;
            }

            const service = new google.maps.places.AutocompleteService();

            service.getPlacePredictions(
                {
                    input: query,
                    language: 'fr',
                },
                (predictions: any[], status: string) => {
                    if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
                        setSuggestions([]);
                        return;
                    }

                    setSuggestions(predictions.map((p) => p.description));
                }
            );
        }, 300); // debounce

        return () => clearTimeout(timer);
    }, [query, enable]);

    return suggestions;
}
