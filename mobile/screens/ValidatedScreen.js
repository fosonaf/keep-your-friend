import { View, Image, StyleSheet, Text } from 'react-native';

export default function ValidatedScreen({ route }) {
    const { photoUri } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Photo validée ✅</Text>
            <Image source={{ uri: photoUri }} style={styles.preview} />
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
    title: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
    },
    preview: {
        width: '90%',
        height: '70%',
        borderRadius: 12,
    },
});
