export async function geocodeLocation(location: string): Promise<[number, number] | null> {
    if (!location) return null;

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

    if (!apiKey) {
        console.error('VITE_GOOGLE_MAPS_API_KEY est manquant.');
        return null;
    }

    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
        )}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return [lat, lng];
    }

    return null;
}
