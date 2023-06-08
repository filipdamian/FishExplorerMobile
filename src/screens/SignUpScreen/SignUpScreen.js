import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import config from '../../../config';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const { control, handleSubmit } = useForm();
    const navigation = useNavigation();

    const onSignInNavPressed = () => {
        navigation.navigate("SignIn")
    }
    const onRegisterPressed = async (data) => {

        const requestBody = {
            firstName: data.FirstName,
            lastName: data.LastName,
            email: data.Email,
            password: data.Password,
            phoneNumber: data.PhoneNumber,
            phoneNumberCountryPrefix: data.CountryPrefix,
        };

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/Account/register`, {
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
            else{
                navigation.navigate("ConfirmEmail")
            }
        } catch (error) {
        }
    }
    const onTOSPressed = () => {
        console.warn('TOS')
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>

                <Text style={styles.title}>Register your account</Text>
                <CustomInput
                    name="FirstName"
                    control={control}
                    placeholder="FirstName"
                    rules={{ required: 'First Name is required' }}
                />
                <CustomInput
                    name="LastName"
                    control={control}
                    placeholder="LastName"
                    rules={{ required: 'Last Name is required' }}
                />
                <CustomInput
                    name="Email"
                    control={control}
                    placeholder="Email"
                    rules={{ pattern: { value: EMAIL_REGEX, message: 'Email is invalid' } }}
                />
                <CustomInput
                    name="Password"
                    control={control}
                    placeholder="Password"
                    secureTextEntry
                    rules={
                        {
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Password should be at least 6 characters long' },
                            maxLenght: { value: 20, message: 'Password should be max 20 characters long' }
                        }}
                />
                <CustomInput
                    name="PhoneNumber"
                    control={control}
                    placeholder="Phone Number"
                    rules={{ required: 'Phone Number is required' }}
                />
                <CustomInput
                    name="CountryPrefix"
                    control={control}
                    placeholder="Country Prefix"
                    rules={{ required: 'Country Prefix is required' }}
                />
                <CustomButton
                    onPress={handleSubmit(onRegisterPressed)}
                    text={"Register"}
                />
                <Text style={styles.text}>
                    By registtering, you confirm that you accept our{' '}
                    <Text style={styles.linkText} onPress={onTOSPressed}>Terms of Use</Text>
                    {' '}and{' '}
                    <Text style={styles.linkText} onPress={onTOSPressed}>Privacy Policy.</Text>
                </Text>
                <SocialSignInButtons />
                <CustomButton
                    onPress={onSignInNavPressed}
                    text={"Have an account? Sign In!"}
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
        width: '40%',
        maxWidth: 300,
        maxHeight: 300,
        height: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    linkText: {
        color: '#FDB075'
    }
})

export default SignUpScreen