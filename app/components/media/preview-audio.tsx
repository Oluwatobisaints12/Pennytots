import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from "@react-native-community/slider"
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { toHHMMSS } from 'app/helpers';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export default function PreviewAudio(props: any) {
  const navigation = useNavigation();
  const { audioLink } = props;
  const [currentPlayPosition, setCurrentPlayPosition] = useState('00:00');
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState<any>("");
  const timerRef = useRef<any>(null);
  const [playbackPosition, setPlaybackPosition] = useState<number>(0);

  useEffect(() => {
    async function loadAudio() {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioLink }
      );
      setSound(sound);
      const status = await sound.getStatusAsync();
      setDuration(status.durationMillis);
    }

    loadAudio();
    return () => {
    
    };
  }, [audioLink]);

  useEffect(() => {
    if (sound && isPlaying) {
      timerRef.current = setInterval(async () => {
        const status = await sound.getStatusAsync();
        const currentPosition = status.positionMillis;
        const sliderLocation = currentPosition / duration; // Normalized value
        setSliderValue(sliderLocation);
        setPlaybackPosition(currentPosition);
        setCurrentPlayPosition(toHHMMSS(currentPosition));
      }, 50);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return async () => {
      console.log("blablablacksheep")
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if(isPlaying && sound){
        await sound.pauseAsync()
        await sound.unloadAsync();
      }
    };
  }, [isPlaying, sound, duration]);

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync(); 
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value: number) => {
    console.log(value)
    if (sound) {
      sound.setPositionAsync(value);
      setSliderValue(value);
      setPosition(value)
    }
  };



  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {sound ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FontAwesome
            name='volume-up'
            size={100}
            style={{ marginRight: 5 }}
            color='grey'
          />

          <View
            style={{
              width: '65%',
              marginTop: 70,
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={togglePlayback}
              style={{
                padding: 10,
              }}
            >
              {isPlaying ? (
                <FontAwesome
                  name='pause'
                  size={20}
                  style={{ marginRight: 7 }}
                  color='white'
                />
              ) : (
                <FontAwesome
                  name='play'
                  size={20}
                  style={{ marginRight: 7 }}
                  color='white'
                />
              )}
            </TouchableOpacity>
            <Text style={{ color: 'white' }}>{currentPlayPosition}</Text>
            <View
              style={{
                width: '75%',
                marginHorizontal: 6,
                justifyContent: 'center',
              }}
            >
              <Slider
                value={sliderValue}
                onValueChange={handleSliderChange}
                minimumValue={0}
                maximumValue={duration}
                
              />
            </View>
            <Text style={{ color: 'white' }}>{toHHMMSS(duration)}</Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FontAwesome
            name='volume-up'
            size={80}
            style={{ marginRight: 5 }}
            color='grey'
          />
  
          <Text
            style={{
              paddingTop: 20,
              fontSize: 30,
              color: 'grey',
              fontWeight: 'bold',
            }}
          >
            Cant Preview
          </Text>
        </View>
      )}
    </View>
    );
  }