import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export function selectImage(callback) {
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel || response.error) {
      console.log('error at select image');
      console.log(response.error);
    } else {
      callback({
        uri: response.uri,
        data: response.data,
        key: response.fileName,
      });
    }
  });
}
