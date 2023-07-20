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

import { StyledCameraNotificationBox, StyledCameraButtonText } from "./styles";

const CameraNotificationBox = ({ icon, content, theme }) => {
    return <StyledCameraNotificationBox theme={theme}>
        <Entypo name={icon} size={100} color="#FFFFFF" />
        <StyledCameraButtonText>
            {content}
        </StyledCameraButtonText>
    </StyledCameraNotificationBox>;
};

export default CameraNotificationBox;