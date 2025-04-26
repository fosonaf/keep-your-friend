export async function geocodeLocation(location: string): Promise<[number, number] | null> {
    if (!location) return null;

    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );
    const data = await response.json();

    if (data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lat), parseFloat(lon)];
    } else {
        return null;
    }
}
