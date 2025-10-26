import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;

type Props = {
    navigation: CameraScreenNavigationProp;
};

export default function CameraScreen({ navigation }: Props) {
    const [permission, requestPermission] = useCameraPermissions();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const cameraRef = useRef<Camera | null>(null);

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
            navigation.navigate('Preview', { photoUri: photo.uri });
        }
    };

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing="back" />
            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.buttonText}>📸 Prendre la photo</Text>
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
        bottom: 80,
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
});
