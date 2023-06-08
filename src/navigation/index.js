import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View,Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CameraScreen from '../screens/CameraScreen';
import AccountScreen from '../screens/AccountScreen';
import CompatibilityScreen from '../screens/CompatibilityScreen';
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    initialRouteName={"Camera"}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Camera") {
          iconName = focused ? "camera" : "camera-outline";
        } else if (route.name === "Compatibility") {
          iconName = focused ? "fishbowl" : "fishbowl-outline";
        }
        else if (route.name === "Account") {
          iconName = focused ? "account" : "account-outline";
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      }
    }
    )}
    tabBarOptions={{
      activeTintColor: 'black',
      inactiveTintColor: 'black',
      labelStyle: { paddingBottom: 10, fontSize: 10 },
      style: { padding: 10, height: 70 }
    }}
  >
    <Tab.Screen name="Camera" component={CameraScreen} />
    <Tab.Screen name="Compatibility" component={CompatibilityScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />

  </Tab.Navigator>
);

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
                <Stack.Screen name ="Home" component={HomeTabs}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation
