import * as Font from 'expo-font';

export default useFonts = async () => {
  await Font.loadAsync({
    regular: require('app/assets/fonts/Poppins-Regular.ttf'),
    bold: require('app/assets/fonts/Poppins-Bold.ttf'),
    italic: require('app/assets/fonts/Poppins-Italic.ttf'),
    extraBold: require('app/assets/fonts/Poppins-ExtraBold.ttf'),
    black: require('app/assets/fonts/Poppins-Black.ttf'),
    semiBold: require('app/assets/fonts/Poppins-SemiBold.ttf'),
    // All other fonts here
  });
};
