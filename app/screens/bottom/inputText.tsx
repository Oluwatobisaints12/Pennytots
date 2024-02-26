import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import GameMode from './gameMode';
import ChallengeMode from './challengeMode';

const InputText = () => {
  const [text, setText] = useState(''); // State for TextInput text
  const navigation = useNavigation();

 
  return (
    <View>
      <ChallengeMode onChangeText={setText} />
      <GameMode text={text} />
    </View>
  );
};

export default InputText;
