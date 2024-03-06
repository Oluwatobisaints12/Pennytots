import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import { useGetCredit } from 'app/redux/credit/hook';
import { processFontFamily } from 'expo-font';
import useFonts from 'app/hooks/useFont.js'; // Corrected import name
import { useNavigation } from '@react-navigation/native';


interface ChallengeModeProps {
  onChangeText: (text: string) => void;
  navigation: any; // Adjust the type according to your navigation prop type
  // Define the type of the 'onChangeText' prop
}
const ChallengeMode: React.FC<ChallengeModeProps>=({ route }: any) => {
  // Extract pennytot and credit from route.params
  const { data: credits } = useGetCredit();
  const navigation = useNavigation(); // Get navigation object

  const [text, setText] = React.useState('');

  const handleNavigateToGameMode = () => {
    // You can do some validation here before navigating
    navigation.navigate('GameMode', { text: text }); // Passing the 'text' parameter
  };
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: 364, marginTop: 36.96 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('app/assets/Vector.png')}
              style={{ width: 24, height: 24, marginRight: 1.5 }}
            />
            <Text style={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'extraBold', }}>Game Mode</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ paddingRight: 5, fontWeight: 'bold' }}>{credits?.amount}</Text>
            <Text style={{ fontWeight: 'bold' }}>Pennytots</Text>
          </View>
        </View>
  
        <View style={{ alignItems: 'center' }}>
          <Text style={{marginTop: 32, fontFamily: 'extraBold', fontWeight: 'bold', fontSize: 24, lineHeight: 36, width: 213, height:36, color: '#797978'}}>CHALLENGE MODE</Text>
          <Image
            style={{marginTop: 22, width:256.63, height: 260}}
            source={require(`app/assets/challengemode.png`)}
          />
        </View>
      </View>
      <Text style={{fontSize: 13,  marginLeft: 34,fontWeight: 'bold', width: 361, height: 60, lineHeight: 19.5, marginTop: 39, alignItems: 'center', color: '#494949', fontFamily: 'extraBold',}}>Answer 30 questions correctly before the time runs out to win double the staked pennytots. You lose the staked amount if you fail to complete the challenge</Text>
      <Text style={{fontSize: 13, fontWeight: 'bold', lineHeight: 13.5, marginTop: 19, color: '#494949', fontFamily: 'extraBold',}}>
        You need to have at least 5000 penytots to play
      </Text>
      <Text style={{marginTop:29.99, fontWeight: 'bold', fontSize: 14, color: '#797978', fontFamily: 'extraBold',}}>Stake</Text>
      <TextInput
          style={[styles.input, { textAlign: 'center' }]}
          onChangeText={setText}
          value={text}
          placeholder=""
          keyboardType="numeric" // Use numeric keyboard for numerical input
        />
        
      <TouchableOpacity style={styles.button} onPress={handleNavigateToGameMode}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
  
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FED830',
    width: 364,
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', 
    borderRadius: 32,
    marginTop: 41,
  },
  input: {
    height: 30,
    width: 115,
     marginTop: 8,
     borderRadius: 1.5,
    borderColor: 'none',
    backgroundColor: '#E8E8E8',
    
    fontFamily: '', 
    fontSize: 14,
    fontWeight: '500'// Use Poppins font family for TextInput
  },
  buttonText: {
    color: '#48463E',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    fontFamily: 'extraBold'
  },
});

export default ChallengeMode;
