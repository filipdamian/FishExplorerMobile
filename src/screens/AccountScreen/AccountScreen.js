import * as React from 'react';
import { View, Text, Button, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = () => {
    const navigation = useNavigation();
    const { height } = useWindowDimensions();

    const logout = async () => {
        // Remove tokens from AsyncStorage
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('refreshToken');

        // Navigate to SignIn screen
        navigation.navigate('SignIn');
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Account Screen</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
};

export default AccountScreen;
