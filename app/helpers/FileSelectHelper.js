import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions';

async function getPermission() {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

  if (status !== 'granted') {
    throw new Error('Permissions not granted to access Storage');
  }

  return true;
}

export async function FileSelectHelper(fileType, isMultiple, withFullPath) {
  try {
    await getPermission();

    const audioTypes = [
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/aac',
      'audio/x-m4a',
    ];

    const response = await DocumentPicker.getDocumentAsync({
      type: '*/*', // You can customize this based on the file types you want to allow
    });

    if (response.type === 'cancel') {
      throw new Error('User cancelled file picker');
    } else if (response.type === 'error') {
      throw new Error('Error selecting file');
    } else {
      console.log(response, 'selected');

      if (fileType === 'audio' && !audioTypes.includes(response.mimeType)) {
        throw new Error('Selected File Not An Audio File');
      }

      const { uri, type, name, size } = response;

      // If you need the file content, you can read it using Expo's FileSystem API
      // For example:
      // const fileContent = await FileSystem.readAsStringAsync(uri);

      return {
        name,
        path: uri,
        fileName: name,
        type,
        uri,
        fileSize: size,
      };
    }
  } catch (error) {
    throw new Error('Error processing file: ' + error.message);
  }
}
