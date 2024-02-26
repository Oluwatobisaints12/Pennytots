import React, { FunctionComponent } from 'react'
// import FastImage from 'react-native-fast-image';
import { Image } from 'react-native';


type AvatarProps = {
  size: number;
  source?: string;
  type?: 'user' | 'group';
}

const Avatar: FunctionComponent<AvatarProps> = ({ source, type, size }) => {
  const imageSource = source
    ? { uri: source }
    : type === 'user'
    ? require('../../assets/user.jpg')
    : require('../../assets/group.jpg');

  return (
    <Image
      source={imageSource}
      style={{
        width: size,
        height: size,
        borderRadius: size
      }}
      resizeMode="cover"
    />
  );
};


export default Avatar;