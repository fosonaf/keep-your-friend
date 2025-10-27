import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface KButtonProps {
    label: string;
    handleClick: () => void;
    disabled?: boolean;
}

const KButton: React.FC<KButtonProps> = ({ label, handleClick, disabled = false }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.buttonDisabled]}
            onPress={handleClick}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFA500',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonDisabled: {
        backgroundColor: '#555',
    },
    label: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
    },
    labelDisabled: {
        color: '#ccc',
    },
});

export default KButton;
