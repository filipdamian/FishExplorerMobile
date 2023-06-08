import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import config from '../../../config';
import * as ImageManipulator from 'expo-image-manipulator';

export default function CameraScreen() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [mediaLibPermission, setMediaLibPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus === 'granted');

      const { status: mediaLibStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaLibStatus !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      setMediaLibPermission(mediaLibStatus === 'granted');
    })();
  }, []);

  if (cameraPermission === null || mediaLibPermission === null) {
    return <View />;
  }
  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (mediaLibPermission === false) {
    return <Text>No access to media library</Text>;
  }

  const takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
  
      // Manipulate the photo
      const manipResult = await ImageManipulator.manipulateAsync(
        photo.uri,
        [ { crop: { originX: 0, originY: 0, width: 3024, height: 4032 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
  
      const asset = await MediaLibrary.createAssetAsync(manipResult.uri);
      await MediaLibrary.createAlbumAsync('Expo', asset, false);
  
      let formData = new FormData();
      formData.append('File', {
        uri: manipResult.uri,
        name: 'photo.jpg',
        type: 'image/jpeg'
      });
  
      try {
        let response = await fetch(`${config.API_BASE_URL}/api/Account/Image-Prediction`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log(response)
        let responseJson = await response.json();
        console.log(responseJson);
      } catch (error) {
        console.error('Error:', error);
        console.log('Error name:', error.name);
        console.log('Error message:', error.message);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("oof")
    console.log(result.canceled)
    if (!result.canceled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      const asset = await MediaLibrary.createAssetAsync(manipResult.uri);
      await MediaLibrary.createAlbumAsync('Expo', asset, false);

      // handle image...
      let formData = new FormData();
      formData.append('File', {
        uri: manipResult.uri,
        name: 'photo.jpg',
        type: 'image/jpeg'
      });
      console.log("ceva");
      try {
        let response = await fetch(`${config.API_BASE_URL}/api/Account/Image-Prediction`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("aici")
        let responseText = await response.text();
        Alert.alert("Server Response", responseText);
        console.log(responseText);
      } catch (error) {
        console.error('Error:', error);
        console.log('Error name:', error.name);
        console.log('Error message:', error.message);
      }

    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => { this.camera = ref; }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#000', // Bar color, change this as per your preference
              padding: 10, // Bar padding, change this as per your preference
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
              }}
              onPress={takePicture}
            >
              <Text style={{ fontSize: 18, color: 'white' }}> Capture </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
              }}
              onPress={pickImage}
            >
              <Text style={{ fontSize: 18, color: 'white' }}> Pick Image </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

