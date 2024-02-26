import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function PreviewVideo(props:any) {
  const { videoLink } = props;
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const handlePlaybackStatusUpdate = (newStatus:any) => {
    setStatus(newStatus);
  };

  return (
    <View style={styles.container}>
      {videoLink ? (
        <Video
          ref={video}
          style={{
            height: wp('80%'),
            width: wp('80%'),
            alignSelf: 'center',
            flex: 1,
          }}
          source={{
            uri: videoLink,
          }}
          useNativeControls={true}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      ) : null}
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
