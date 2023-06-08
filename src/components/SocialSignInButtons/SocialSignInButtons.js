import React, { useState, useEffect } from 'react'
import {View, Text} from 'react-native'
import CustomButton from "../CustomButton";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook'

WebBrowser.maybeCompleteAuthSession();

const SocialSignInButtons = () => {

    const [request, response, GooglepromptAsync] = Google.useAuthRequest(
        {
          clientId: '539083052155-rhismcb8hlou3s06urfoarl30qn7q943.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
          responseType: ResponseType.Token,
          usePKCE: false,
          redirectUri: makeRedirectUri({
            native: 'fish-explorer-scheme/@filipd29/your-app-slug',
            useProxy: true,
          }),
        },
        Google.discovery
      );

      const [requestFacebook, responseFacebook, FacebookpromptAsync] = Facebook.useAuthRequest(
        {
          clientId: '959457145245765',
        //   scopes:['email'],
          responseType: ResponseType.Token,
          redirectUri: makeRedirectUri({
            native: 'fish-explorer-scheme/@filipd29/your-app-slug',
            useProxy: true,
          }),
        },
        Facebook.discovery
      );
    
      useEffect(() => {
        if (response?.type === 'success') {
          const { access_token } = response.params;
          console.log(access_token); 
          handleBackendGoogleLogin(access_token);
        }
        if (responseFacebook?.type === 'success') {
            const { access_token } = responseFacebook.params;
            console.log("teooooooooooo", access_token)
            handleBackendFacebookLogin(access_token);
          }
      }, [response,responseFacebook]);
    
      const handleGoogleLogin = async () => {
        await GooglepromptAsync();
      };

      const handleFacebookLogin = async () => {
        await FacebookpromptAsync();
      };
    
      const handleBackendGoogleLogin = async (accessToken) => {
        console.log(accessToken); 
        try {
          const response = await fetch(`${config.API_BASE_URL}/api/Account/google-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accessToken })
          });
    
          if (!response.ok) {
            const errorResponse = await response.text();
            console.warn(errorResponse);
          } else {
            navigation.navigate("Home");
          }
        } catch (error) {
          console.warn(error);
        }
      };


      const handleBackendFacebookLogin = async (accessToken) => {
        try {
          const response = await fetch(`${config.API_BASE_URL}/api/Account/facebook-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken }),
          });
    
          if (!response.ok) {
            const errorResponse = await response.text();
            console.warn(errorResponse);
          } else {
            navigation.navigate('Home');
          }
        } catch (error) {
          console.warn(error);
        }
      };

    return(
        <>
                <CustomButton
                    onPress={handleGoogleLogin}
                    text={"Sign In with Google"}
                    bgColor="#FAE9EA"
                    fgColor="#DD4D44"
                />
                <CustomButton
                    onPress={handleFacebookLogin}
                    text={"Sign In with Facebook"}
                    bgColor="#E7EAF4"
                    fgColor="#4765A9"
                />
        </>
    )
}
export default SocialSignInButtons