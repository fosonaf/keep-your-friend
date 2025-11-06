import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { useState } from "react";

type PreviewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Preview'>;
type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Preview'>;

type Props = {
    navigation: PreviewScreenNavigationProp;
    route: PreviewScreenRouteProp;
};

export default function PreviewScreen({ route, navigation }: Props) {
    const { photoUri } = route.params;

    const [loading, setLoading] = useState(false);

    const submitAnimalRequest = async () => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append('image', {
                uri: photoUri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            } as any);

            const response = await fetch(`http://192.168.1.20:5000/lost-animals/validate`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}`);
            }

            Alert.alert('Succès', 'Animal enregistré avec succès 🐾');
            // navigate to summary screen

        } catch (error) {
            console.error('Erreur:', error);
            Alert.alert('Erreur', 'Une erreur est survenue pendant l\'envoi. ' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: photoUri }} style={styles.preview} />

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={[styles.button, styles.secondary]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>🔁 Reprendre</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.primary]}
                    onPress={submitAnimalRequest}
                >
                    <Text style={styles.buttonText}>✅ Valider</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        width: '90%',
        height: '70%',
        borderRadius: 12,
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    primary: {
        backgroundColor: '#007AFF',
    },
    secondary: {
        backgroundColor: '#555',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
