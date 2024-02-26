// import * as Font from 'expo-font';
// import { Platform } from 'react-native';
// import { getAssetFromModule } from 'expo-asset';

// const fontConfig = require('app/assets/fonts');

// export const loadFonts = async () => {
//   await Font.loadAsync(
//     Object.entries(fontConfig).reduce((prev, [name, value]) => {
//       const [assetModule] = getAssetFromModule(value);

//       return {
//         ...prev,
//         [name]: assetModule,
//       };
//     }, {})
//   );
// };

// export const setGlobalFont = () => {
//   const fontFamily = Object.keys(fontConfig).reduce((prev, name) => {
//     return {
//       ...prev,
//       [name]: Platform.OS === 'android' ? name : fontConfig[name],
//     };
//   }, {});

//   Text.defaultProps = Text.defaultProps || {};
//   Text.defaultProps.style = [{ fontFamily }];
// };
