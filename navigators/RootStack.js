// Copyright 2023 tringuyen
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Entypo } from "@expo/vector-icons";

// screens
import Login from './../screens/Login.js'
import Signup from './../screens/Signup.js';
import Welcome from './../screens/Welcome.js';
import CameraScreen from './../screens/Camera.js';

import { Colors } from "../components/styles.js";
import CameraButton from "../components/CameraButton.js";

const Stack = createStackNavigator();

const { tertiary } = Colors;

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyled: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Camera" component={CameraScreen}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <CameraButton title='Back' icon='back' onPress={() => navigation.goBack()} />
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;