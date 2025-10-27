import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface KFieldProps {
    placeholder: string;
    label: string;
    inputValue: string;
    setInputValue: (value: string) => void;
    multiline?: boolean;
}

const KField: React.FC<KFieldProps> = ({
                                             placeholder,
                                             label,
                                             inputValue,
                                             setInputValue,
                                             multiline = false,
                                         }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                value={inputValue}
                onChangeText={setInputValue}
                style={styles.input}
                multiline={multiline}
            />
        </View>
    );
};

export default KField;

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        color: 'white',
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        color: 'white',
        backgroundColor: '#222',
        borderRadius: 6,
    },
});
