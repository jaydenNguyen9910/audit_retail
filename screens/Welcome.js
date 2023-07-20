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
import { StatusBar } from "expo-status-bar";

import {
    Avatar,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    WelcomeContainer,
} from "../components/styles";

const Welcome = ({ navigation, route }) => {
    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeContainer>
                    <StyledFormArea>
                        <Avatar resizeMode="contain" source={require('./../assets/img/tensor_logo.png')} />
                        <PageTitle>Audit Retail</PageTitle>
                        <SubTitle welcome={true}>Merchandising</SubTitle>
                        <StyledButton onPress={() => navigation.navigate("Camera", { token: route.params.token })}>
                            <ButtonText>Take Picture</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
}

export default Welcome;