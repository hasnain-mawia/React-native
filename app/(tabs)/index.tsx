import { Image, Platform } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/dashboard-style';

export default function HomeScreen() {
  const camera = useRef<any>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<any>();
  const [Gallery, setGallery] = useState([]);

  if (!permission) {
    return <View/>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container} className='m-10'>
      <Text style={styles.message}>We need your permission to show the camera</Text>
      <Button onPress={requestPermission} title="grant permission" />
    </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  async function takepicture() {
    const picture = await camera.current.takePictureAsync()
    setImage(picture)
  }

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer} className='flex'>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text className='bg-white px-2 py-1 rounded-2xl '>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takepicture}>
            <Text className='bg-white px-2 py-1 rounded-2xl '>Capture</Text>
          </TouchableOpacity>
        </View>
      </CameraView> 
      
      <View className='flex'>
        {
          
        }
        <Image source={{uri:image?.uri}} style={{flex:1}}/>
      </View>
      </View>
    
  );
}


