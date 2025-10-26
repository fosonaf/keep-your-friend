import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

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
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        })();
    }, []);

    return (
        <View style={styles.container}>
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
                    </>
                ) : (
                    <ActivityIndicator size="small" color="#FFA500" />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 60,
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
