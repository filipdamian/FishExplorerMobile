import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput } from 'react-native'
import Logo from '../../../assets/imgs/betta_logo.png'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import config from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {

    const navigation = useNavigation();
    const { height } = useWindowDimensions();

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSignInPressed = async (data) => {

        const requestBody = {
            uniqueIdentifier: data.Username,
            password: data.Password,
        };
        console.log(requestBody)
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/Account/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorResponse = await response.text(); // Parse error message from response body
                console.warn(errorResponse);

            }
            else {
                const { token, refreshToken } = await response.json();
                
                console.log(token, refreshToken);

                await AsyncStorage.setItem('userToken', token);
                await AsyncStorage.setItem('refreshToken', refreshToken);

                navigation.navigate("Home");
            }
        } catch (error) {
        }
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate("ForgotPassword")
    }
    const onRegisterNavigationPressed = () => {
        navigation.navigate("SignUp")
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />
                <CustomInput
                    name="Username"
                    placeholder="Username"
                    control={control}
                    rules={{ required: 'Username is required' }}
                />
                <CustomInput
                    name="Password"
                    placeholder="Password"
                    control={control}
                    secureTextEntry={true}
                    rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password needs minimum 6 characters' } }}
                />
                <CustomButton
                    onPress={handleSubmit(onSignInPressed)}
                    text={"Login"}
                />
                <CustomButton
                    onPress={onForgotPasswordPressed}
                    text={"Forgot password"}
                    type="TERTIARY"
                />
                <SocialSignInButtons />
                <CustomButton
                    onPress={onRegisterNavigationPressed}
                    text={"Don't have an account? Create one!"}
                    type="TERTIARY"
                />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '60%',
        maxWidth: 300,
        maxHeight: 300,
        height: 100,
    },
})

export default SignInScreen