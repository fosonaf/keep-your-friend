import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
    const [permission, requestPermission] = useCameraPermissions();
    const [hasPermission, setHasPermission] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        if (permission && permission.granted) {
            setHasPermission(true);
        } else if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Demande de permission...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>Permission refusée pour la caméra</Text>
            </View>
        );
    }

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setPhotoUri(photo.uri);
        }
    };

    const resetPhoto = () => setPhotoUri(null);

    // 🖼️ Si on a pris une photo → on affiche la preview
    if (photoUri) {
        return (
            <View style={styles.previewContainer}>
                <Image source={{ uri: photoUri }} style={styles.preview} />
                <TouchableOpacity style={styles.button} onPress={resetPhoto}>
                    <Text style={styles.buttonText}>Reprendre une photo</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // 📷 Sinon → caméra en direct
    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing="back" />
            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.buttonText}>Prendre la photo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    controls: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    preview: {
        width: '90%',
        height: '70%',
        borderRadius: 12,
    },
});
