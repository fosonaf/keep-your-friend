import React, {JSX} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';
import PreviewScreen from './screens/PreviewScreen';
import ValidatedScreen from './screens/ValidatedScreen';

export type RootStackParamList = {
    Camera: undefined;
    Preview: { photoUri: string };
    Validated: { photoUri: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Camera" component={CameraScreen} />
                <Stack.Screen name="Preview" component={PreviewScreen} />
                <Stack.Screen name="Validated" component={ValidatedScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
