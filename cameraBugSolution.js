```javascript
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import React, { useState, useEffect } from 'react';

async function takePictureAsync(camera) {
  try {
    const photo = await camera.takePictureAsync();
    // Handle the photo
  } catch (error) {
    console.error('Error taking picture:', error);
  }
}

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraRef = (ref) => {
    setCamera(ref);
  }

  if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={handleCameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
            }}
            onPress={() => {
              if(camera) {
                takePictureAsync(camera);
              }
            }}>
            <Text style={{ fontSize: 18, color: '#fff' }}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
export default CameraScreen;
```