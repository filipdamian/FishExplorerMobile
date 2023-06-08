import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import config from '../../../config';

const ResetPasswordScreen = () => {

    const { control, handleSubmit } = useForm();

    const navigation = useNavigation();

    const onSendEmailPressed = async(data) => {
        const requestBody = {
            passwordToken: data.Token,
            newPassword: data.NewPassword,
            confirmedNewPassword: data.ConfirmPassword,
        };
        console.log(requestBody)
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/Account/password-recovery`, {
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
                navigation.navigate("SignIn")
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
                    name="Token"
                    control={control}
                    placeholder="Token"
                    rules={{ required: 'Token is required' }}
                />
                <CustomInput
                    name="NewPassword"
                    control={control}
                    placeholder="New Password"
                    rules={{ required: 'New Password is required' }}
                />
                <CustomInput
                    name="ConfirmPassword"
                    control={control}
                    placeholder="Confirm Password"
                    rules={{ required: 'Confirm Password is required' }}
                />
                <CustomButton
                    onPress={handleSubmit(onSendEmailPressed)}
                    text={"Reset Password"}
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

export default ResetPasswordScreen