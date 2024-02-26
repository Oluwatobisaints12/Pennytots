import { View, Text, TouchableOpacity,Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { FileHelper } from 'app/helpers';
// import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Video(props: any) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.link) {
          props.navigation.push('Common', {
            screen: 'preview-attachment',
            params: {
              type: 'video',
              attachment: props.link,
            },
          });
        }
      }}
      style={{
        height: hp('30%'),
        width: '100%',

        backgroundColor: 'black',
        paddingTop: hp('10.5%'),
      }}
    >
      <View
        style={{
          marginBottom: -hp('17.5%'),
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,

          flexDirection: 'column',
        }}
      >
        <Ionicons name='play-circle' size={35} color='white' />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {FileHelper.byteToFileSize(props.attachmentSize)}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'black',
        }}
      >
        <Image
          source={{
            uri: props.link,
          }}
          style={{
            height: hp('30%'),
            width: '100%',
          }}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
}
