import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type PreviewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Preview'>;
type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Preview'>;

type Props = {
    navigation: PreviewScreenNavigationProp;
    route: PreviewScreenRouteProp;
};

export default function PreviewScreen({ route, navigation }: Props) {
    const { photoUri } = route.params;

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
                    onPress={() => navigation.navigate('Validated', { photoUri })}
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
