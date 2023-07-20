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

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { ActivityIndicator } from "react-native";
import axios from "axios";

import {
    Colors,
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from "../components/styles";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import CustomTextInput from "../components/CustomTextInput";

const { darkLight, primary } = Colors;

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = "http://113.160.226.174:50006/register";

        axios.post(url, credentials)
            .then(response => {
                const result = response.data;

                navigation.replace('Login', { username: credentials.username, ...result });
            })
            .catch(error => {
                if (error.response.data.detail) {
                    handleMessage(`Error: ${error.response.data.detail}.`, 'FAILED')
                }
                else {
                    handleMessage('An error occurs. Please try again later!', 'FAILED')
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="contain" source={require('./../assets/img/tensor_logo.png')} />
                {/* <PageTitle>Audit Retail</PageTitle> */}
                <SubTitle>Account Signup</SubTitle>
                <Formik
                    initialValues={{ email: '', username: '', password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.email == '' | values.username == '' | values.password == '') {
                            handleMessage('Please fill all the fields!');
                            setSubmitting(false);
                        }
                        else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >
                    {
                        ({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => <StyledFormArea>
                            <CustomTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="example@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />

                            <CustomTextInput
                                label="Username"
                                icon="person"
                                placeholder="Username"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />

                            <CustomTextInput
                                label="Password"
                                icon="lock"
                                placeholder="**********"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>

                            {!isSubmitting &&
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Signup</ButtonText>
                                </StyledButton>
                            }

                            {isSubmitting &&
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size='large' color={primary} />
                                </StyledButton>
                            }

                            <Line />

                            <ExtraView>
                                <ExtraText>Already have an account? </ExtraText>
                                <TextLink onPress={() => navigation.replace("Login")}>
                                    <TextLinkContent>Login</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    }
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

export default Signup;