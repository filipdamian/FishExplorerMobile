import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import config from '../../../config';

const ConfirmEmailScreen = () => {

    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onConfirmCodePressedPressed = async (data) => {

        const requestBody = {
            confirmationToken: data.ConfirmationCode,
        };

        console.log(requestBody)

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/Account/email-confirm`, {
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
                navigation.navigate("SignIn")
            }
        } catch (error) {
        }
    }
    const onBackToSignInPressed = () => {
        navigation.navigate("SignIn")
    }
    const onResendButtonPressed = () => {
        handleSubmit(onConfirmCodePressedPressed)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>

                <Text style={styles.title}>Confirm your Email</Text>
                <CustomInput
                    name="ConfirmationCode"
                    placeholder="Confirmation Code"
                    control={control}
                    rules={{ required: 'Username is required' }}
                />
                <CustomButton
                    onPress={handleSubmit(onConfirmCodePressedPressed)}
                    text={"Confirm Code"}
                />

                <CustomButton
                    text={"Resend Code"}
                    type="SECONDARY"
                    onPress={onResendButtonPressed}
                />
                <CustomButton
                    text={"Back to Sign In"}
                    type="TERTIARY"
                    onPress={onBackToSignInPressed}
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

export default ConfirmEmailScreen