import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface KSelectProps {
    placeholder: string;
    label: string;
    option: string;
    setOption: (value: string) => void;
    options: string[];
}

const KSelect: React.FC<KSelectProps> = ({
                                             placeholder,
                                             label,
                                             option,
                                             setOption,
                                             options,
                                         }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Picker
                selectedValue={option}
                onValueChange={(value) => setOption(value)}
                style={styles.picker}
            >
                <Picker.Item label={placeholder} value="" />
                {options.map((opt) => (
                    <Picker.Item key={opt} label={opt} value={opt} />
                ))}
            </Picker>
        </View>
    );
};

export default KSelect;

const styles = StyleSheet.create({
    container: {
        marginVertical: 3,
    },
    label: {
        color: 'white',
        fontSize: 14,
        marginBottom: 4,
    },
    picker: {
        color: 'white',
        backgroundColor: '#222',
        borderRadius: 6,
    },
});
