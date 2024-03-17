import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useGetCredit } from 'app/redux/credit/hook';
import { processFontFamily } from 'expo-font';
import useFonts from 'app/hooks/useFont.js'; // Corrected import name
import { useNavigation } from '@react-navigation/native';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import { useRoute } from "@react-navigation/native";


 type ChallengeModeRouteParams = {
   gameWin: boolean;
   // Add other route params if needed
 };


interface ChallengeModeProps {
  onChangeText: (text: string) => void;
  navigation: any; // Adjust the type according to your navigation prop type
  // Define the type of the 'onChangeText' prop
}


const ChallengeMode: React.FC<ChallengeModeProps> = ({ route }: any) => {
  


   const { gameWin } = route?.params || {};
   const { data: credits, refetch } = useGetCredit();
 
   useEffect(() => {
     if (gameWin) {
       refetch(credits + (5 * stake));
     }
   }, [gameWin]);
  const navigation = useNavigation(); // Get navigation object

  const [stake, setStake] = React.useState(200);
  const handleIncrement = () => {
    if (stake < 500) { // Check if stake is less than the maximum value
      setStake(stake + 50);
    }
  };





  
  const handleDecrement = () => {
    if (stake > 200) { // Check if stake is greater than the minimum value
      setStake(stake - 50);
    }
  };

  const handleNavigateToGameMode = () => {
    // You can do some validation here before navigating
    navigation.navigate('GameMode', { text: stake }); // Passing the 'text' parameter
  };
  return (
    <SafeAreaView style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 364,
          marginTop: 36.96,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={handleNavigateToGameMode}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('app/assets/Vector.png')}
                style={{ width: rv(24), height: rv(24), marginRight: 1.5 }}
              />
              <Text
                style={{
                  fontSize: rv(14),
                  fontFamily: 'semiBold',
                  fontWeight: '100',
                  paddingLeft: rv(5.5),
                  color: '#4F4F4F',
                }}
              >
                Game Mode
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#4F4F4F',
                fontSize: rv(14),
                fontFamily: 'semiBold',
                fontWeight: '100',
                paddingLeft: rv(5.5),
              }}
            >
              {credits?.amount}
            </Text>
            <Text
              style={{
                color: '#4F4F4F',
                fontSize: rv(14),
                fontFamily: 'semiBold',
                fontWeight: '100',
                paddingLeft: rv(5.5),
              }}
            >
              Pennytots
            </Text>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              marginTop: 32,
              fontFamily: 'semiBold',
              fontSize: rv(24),
              color: '#797978',
            }}
          >
            CHALLENGE MODE
          </Text>
          <Image
            style={{ marginTop: 22, width: 256.63, height: 260 }}
            source={require(`app/assets/challengemode.png`)}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: rv(13),
          // fontWeight: 'bold',
          fontFamily: 'semiBold',
          width: '80%',
          marginTop: 39,
          alignItems: 'center',
          textAlign: 'center',
          color: '#494949',
        }}
      >
        Answer 30 questions correctly before the time runs out to win double the
        staked pennytots. You lose the staked amount if you fail to complete the
        challenge
      </Text>
      <Text
        style={{
          fontSize: rv(13),
          fontFamily: 'semiBold',
          marginTop: 19,
          color: '#494949',
        }}
      >
        You need to have at least 5000 penytots to play
      </Text>
      <View style={styles.container}>
        <Text style={styles.label}>Stake</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleDecrement} disabled={stake <= 200}>
            <Text
              style={[styles.button2, stake <= 200 && styles.disabledButton]}
            >
              -
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setStake(Number(text))}
            value={String(stake)}
            editable={false}
            placeholder=''
            keyboardType='numeric'
          />
          <TouchableOpacity onPress={handleIncrement} disabled={stake >= 500}>
            <Text
              style={[styles.button2, stake >= 500 && styles.disabledButton]}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToGameMode}
      >
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 29.99,
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#797978',
    fontFamily: 'extraBold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
    // Add other styling for your disabled buttons
  },
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
  button2: {
    backgroundColor: 'grey',
    width: 35,
    height: 35,
    textAlign: 'center',
    
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
    
  },

  input: {
    textAlign: 'center',
    height: 30,
    width: 115,
    marginTop: 8,
    borderRadius: 1.5,
    borderColor: 'none',
    backgroundColor: '#E8E8E8',

    fontFamily: '',
    fontSize: 14,
    fontWeight: '500', // Use Poppins font family for TextInput
  },
  buttonText: {
    color: '#48463E',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    fontFamily: 'extraBold',
  },
});

export default ChallengeMode;
