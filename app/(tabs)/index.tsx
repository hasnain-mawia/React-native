import { Alert, Image, Platform } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/dashboard-style';

export default function HomeScreen() {
  const camera = useRef<any>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<any>();
  const [Gallery, setGallery] = useState<any>([]);

  const dltPicture = async (id: any) => {
    const newgallery = [...Gallery];
    await newgallery.splice(id, 1)
    setGallery(newgallery)
    Alert.alert('Picture Remove successfully')
  }

  if (!permission) {
    return <View />;
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
    setGallery([...Gallery, picture])
    setImage(picture)
  }

  console.log(Gallery)
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

      <View className='absolute top-10 right-5 p-2 flex space-y-2'>
        {Gallery.map((img: any, index: number) => {
          return <View key={index} className='flex gap-2 relative'>
            <TouchableOpacity className='bg-[#fa1919] absolute top-0 right-0 z-50 w-[30px] h-[30px] flex-1 justify-center items-center rounded-[30px]' onPress={() => dltPicture(index)}><Text className='text-white text-[20px]'>x</Text></TouchableOpacity>
            <Image source={{ uri: img?.uri }} style={{ width: 100, height: 100 }} />
          </View>
        })
        }

      </View>
    </View >

  );
}


