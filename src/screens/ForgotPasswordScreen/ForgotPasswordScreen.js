import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import config from '../../../config';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSendEmailPressed = async (data) => {

        const requestBody = {
            email: data.Email,
        };

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/Account/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log(response)

            if (!response.ok) {
                const errorResponse = await response.text(); // Parse error message from response body
                console.warn(errorResponse);

            }
            else{
                navigation.navigate("ResetPassword")
            }
        } catch (error) {
        }
    }
    const onBackToSignInPressed = () => {
        navigation.navigate("SignIn")
    }
    const onResendEmailPressed = () => {
        console.warn("RESEND EMAIL")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>

                <Text style={styles.title}>Reset your password</Text>
                <CustomInput
                    name="Email"
                    control={control}
                    placeholder="Email"
                    rules={{required:'Email is required', pattern: { value: EMAIL_REGEX, message: 'Email is invalid' } }}
                />
                <CustomButton
                    onPress={handleSubmit(onSendEmailPressed)}
                    text={"Send Email"}
                />

                <CustomButton
                    text={"Resend Email"}
                    type="SECONDARY"
                    onPress={handleSubmit(onResendEmailPressed)}
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

export default ForgotPasswordScreen