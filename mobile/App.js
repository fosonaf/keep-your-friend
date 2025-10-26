import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';
import PreviewScreen from './screens/PreviewScreen';
import ValidatedScreen from './screens/ValidatedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
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
