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

import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import * as FileSystem from 'expo-file-system';

import CameraButton from "../components/CameraButton";
import CameraNotificationBox from "../components/CameraNotificationBox";
import CameraUploadingIndicator from "../components/CameraUploadingIndicator";

const UploadStatus = {
    NONE: 'none',
    SUCCESSFUL: 'successful',
    FAILED: 'failed',
};
const TIME_OUT = 1000;

const CameraScreen = ({ navigation, route }) => {
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(UploadStatus.NONE);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                setImage(data.uri);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const uploadImage = async () => {
        setUploading(true);

        if (!image) {
            console.log('No image captured');
            return;
        }

        const authToken = route.params.token;
        const serverUrl = 'http://113.160.226.174:50006/images_base64';

        const fileContent = await FileSystem.readAsStringAsync(image, {
            encoding: FileSystem.EncodingType.Base64,
        });
        const formData = new FormData();
        formData.append('file', fileContent);

        try {
            const uploadResponse = await axios.post(serverUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (uploadResponse.status === 200) {
                setUploadStatus(UploadStatus.SUCCESSFUL)
            } else {
                setUploadStatus(UploadStatus.FAILED)
            }
        } catch (error) {
            setUploadStatus(UploadStatus.FAILED)
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        if (uploadStatus !== UploadStatus.NONE) {
            const timeout = setTimeout(() => {
                setUploadStatus(UploadStatus.NONE);
                setImage(null);
            }, TIME_OUT);

            return () => clearTimeout(timeout);
        }
    }, [uploadStatus]);

    // if (hasCameraPermission === false) {
    //     return <Text>No access to camera.</Text>
    // }

    return (
        <View style={styles.container}>
            {!image ?
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                />
                :
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80%',
                    borderRadius: 20
                }}>
                    {uploading ? <CameraUploadingIndicator />
                        : (uploadStatus === UploadStatus.SUCCESSFUL) ? <CameraNotificationBox icon="check" content="Upload Successfuly" theme="green" />
                            : (uploadStatus === UploadStatus.FAILED) ? <CameraNotificationBox icon="cross" content="Upload Failed" theme="red" /> : <></>
                    }
                    <Image style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                    }}
                        source={{ uri: image }} />
                </View>
            }
            <View>
                {image ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 50
                    }}>
                        <CameraButton title='Re-take' icon='retweet' onPress={() => setImage(null)} />
                        <CameraButton title='Upload' icon='arrow-up' onPress={uploadImage} />
                    </View>
                    :
                    <CameraButton title='Take a picture' icon='camera' onPress={takePicture} />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingTop: 75,
        paddingBottom: 25,
    },
    camera: {
        flex: 1,
        borderRadius: 20,
    },
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
    },
    image: {
        height: '80%',
        flex: 1,
        borderRadius: 20,
    }
});

export default CameraScreen;