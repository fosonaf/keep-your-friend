import { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Image,
    StyleSheet,
    Text,
    ActivityIndicator,
    Dimensions,
    Alert,
} from 'react-native';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system/legacy';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import KButton from "../components/KButton";
import KField from "../components/KField";
import KSelect from '../components/KSelect';
import { getCurrentDate, getCurrentTime } from "../utils/dateUtils";

type ValidatedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Validated'>;
type ValidatedScreenRouteProp = RouteProp<RootStackParamList, 'Validated'>;

type Props = {
    navigation: ValidatedScreenNavigationProp;
    route: ValidatedScreenRouteProp;
};

type LocationCoords = {
    latitude: number;
    longitude: number;
};

export default function ValidatedScreen({ route }: Props) {
    const { photoUri } = route.params;
    const [location, setLocation] = useState<LocationCoords | null>(null);
    const [city, setCity] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [animal, setAnimal] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [distinctiveMarks, setDistinctiveMarks] = useState<string>('');

    const screenHeight = Dimensions.get('window').height;
    const photoHeight = screenHeight * 0.25;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission de localisation refusée');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);

            // 🔹 Reverse geocoding pour récupérer la ville
            const [place] = await Location.reverseGeocodeAsync(loc.coords);
            if (place && place.city) setCity(place.city);
        })();
    }, []);

    const submitAnimalRequest = async () => {
        if (!animal || !gender || !color || !location) {
            Alert.alert('Champs manquants', 'Merci de remplir tous les champs obligatoires.');
            return;
        }

        try {
            setLoading(true);

            const fileBase64 = await FileSystem.readAsStringAsync(photoUri, {
                encoding: 'base64',
            });

            const animalData = {
                species: animal,
                gender,
                color,
                distinctiveMarks,
                location: city,
                lat: location.latitude,
                lng: location.longitude,
                image: `data:image/jpeg;base64,${fileBase64}`,
                date: getCurrentDate(),
                hour: getCurrentTime(),
            };

            await fetch(`http://192.168.1.38:5000/lost-animals/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(animalData),
            });

            Alert.alert('Succès', 'Animal enregistré avec succès 🐾');
        } catch (error) {
            console.error('Erreur:', error);
            Alert.alert('Erreur', 'Une erreur est survenue pendant l’envoi. ' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: 'black' }}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Photo validée ✅</Text>

            <Image
                source={{ uri: photoUri }}
                style={[styles.preview, { height: photoHeight }]}
                resizeMode="contain"
            />

            <View style={styles.infoBox}>
                <Text style={styles.subtitle}>📍 Position actuelle :</Text>
                {errorMsg ? (
                    <Text style={styles.error}>{errorMsg}</Text>
                ) : location ? (
                    <>
                        <Text style={styles.coord}>Latitude : {location.latitude.toFixed(6)}</Text>
                        <Text style={styles.coord}>Longitude : {location.longitude.toFixed(6)}</Text>
                        {city ? <Text style={styles.coord}>Ville : {city}</Text> : null}
                    </>
                ) : (
                    <ActivityIndicator size="small" color="#FFA500" />
                )}
            </View>

            <View style={{ marginVertical: 10, width: '50%' }}>
                <KSelect
                    label="Animal"
                    placeholder="Choisissez un animal"
                    option={animal}
                    setOption={setAnimal}
                    options={['Chien', 'Chat', 'Lapin']}
                />
            </View>

            <View style={{ width: '50%' }}>
                <KSelect
                    label="Sexe"
                    placeholder="Sélectionnez le sexe"
                    option={gender}
                    setOption={setGender}
                    options={['Male', 'Femelle', 'Inconnu']}
                />
            </View>

            <View style={{ width: '50%' }}>
                <KField
                    placeholder="Entrer la couleur"
                    label="Couleur"
                    inputValue={color}
                    setInputValue={setColor}
                />
            </View>

            <View style={{ width: '50%' }}>
                <KField
                    placeholder="Décrivez une particularité"
                    label="Marques distinctives (facultatif)"
                    inputValue={distinctiveMarks}
                    setInputValue={setDistinctiveMarks}
                    multiline={true}
                />
            </View>

            <KButton
                label={loading ? 'Envoi en cours...' : 'Envoyer'}
                handleClick={submitAnimalRequest}
                disabled={loading}
            />

            {loading && <ActivityIndicator style={{ marginTop: 20 }} size="small" color="#FFA500" />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 60,
        paddingBottom: 80,
        width: '100%',
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
    },
    preview: {
        width: '90%',
        borderRadius: 12,
        marginBottom: 30,
    },
    infoBox: {
        backgroundColor: '#222',
        width: '90%',
        padding: 16,
        borderRadius: 10,
    },
    subtitle: {
        color: '#FFA500',
        fontSize: 16,
        marginBottom: 10,
    },
    coord: {
        color: 'white',
        fontSize: 14,
    },
    error: {
        color: 'red',
    },
});
