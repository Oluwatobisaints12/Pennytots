declare module 'react-native-svg-flagkit';
declare module 'react-native-segmented-control-tab';
declare module 'react-native-popup-menu';
declare module 'react-native-picker-select';
declare module 'react-native-video';
declare module 'react-native-slider';
declare module 'react-native-raw-bottom-sheet';
declare module 'react-native-webview';
declare module 'react-native-select-dropdown';
declare module 'react-native-paper';
declare module 'react-native-gifted-chat';

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
