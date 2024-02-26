import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { FileHelper } from 'app/helpers';

export default function Audio(props: any) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.link) {

          props.navigation.push('Common', {
            screen: 'preview-attachment',
            params: {
              type: 'audio',
              attachment: props.link,
            },
          });
        }
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Ionicons
          name='play-circle'
          size={21}
          style={{ marginRight: 5 }}
          color='#FFCB05'
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            paddingRight: 15,
          }}
        >
          Audio File
        </Text>
      </View>

      <Text
        style={{
          fontSize: 12,
        }}
      >
        {FileHelper.byteToFileSize(props.attachmentSize)}
      </Text>
    </TouchableOpacity>
  );
}
