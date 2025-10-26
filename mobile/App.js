import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
    const [permission, requestPermission] = useCameraPermissions();
    const [hasPermission, setHasPermission] = useState(null);

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

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing="back" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
});
