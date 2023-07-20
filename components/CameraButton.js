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
import { Entypo } from "@expo/vector-icons";

import { StyledCameraButton, StyledCameraButtonText } from "./styles";

const CameraButton = ({ title, onPress, icon, color }) => {
    return <StyledCameraButton onPress={onPress}>
        <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
        <StyledCameraButtonText>{title}</StyledCameraButtonText>
    </StyledCameraButton>
}

export default CameraButton;