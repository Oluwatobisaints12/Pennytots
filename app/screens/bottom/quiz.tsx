import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  useGetCredit,
  useGetCreditTransactionHistory,
} from 'app/redux/credit/hook';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingAddSVG from 'app/assets/svg/next.svg';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import Animation from 'app/components/animation';
import { useGetQuestions, useChangeUserPennytots } from 'app/redux/quiz/hook';
import { useNavigation } from '@react-navigation/native';
import CreditScreen from 'app/screens/drawer/credit';
import Credits from 'app/navigation/home/drawer'
import { NavigationProp } from '@react-navigation/native';


const Loading = require('../../assets/loading.gif');
const Wrong1 = require('../../assets/gifs/wrong1.gif');
const Wrong2 = require('../../assets/gifs/wrong2.gif');
const Wrong3 = require('../../assets/gifs/wrong3.gif');
const Wrong4 = require('../../assets/gifs/wrong4.gif');
const Wrong5 = require('../../assets/gifs/wrong5.gif');
const Wrong6 = require('../../assets/gifs/wrong6.gif');
const Wrong7 = require('../../assets/gifs/wrong7.gif');
const Wrong8 = require('../../assets/gifs/wrong8.gif');
const Wrong9 = require('../../assets/gifs/wrong9.gif');
const Wrong10 = require('../../assets/gifs/wrong10.gif');
const Wrong11 = require('../../assets/gifs/wrong11.gif');
const Wrong12 = require('../../assets/gifs/wrong12.gif');
const Wrong13 = require('../../assets/gifs/wrong13.gif');
const Wrong14 = require('../../assets/gifs/wrong14.gif');
const Wrong15 = require('../../assets/gifs/wrong15.gif');
const Wrong16 = require('../../assets/gifs/wrong16.gif');
const Wrong17 = require('../../assets/gifs/wrong17.gif');
const Right1 = require('../../assets/gifs/correct1.gif');




const OptionButton = ({ 
  option,
  onPress,
  isWrong,
  isCorrect,
  isSelected,
  canClick,
  style,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: (isCorrect && isSelected) ? "#FFC085" : isSelected ? '#48463E' : '#FED830',
        height: rv(54),
        marginTop: rv(0.5),
        marginBottom: rv(20),
        borderRadius: rv(24),
        padding: rv(7),
        paddingHorizontal: rv(30),
        alignItems: 'center',
        justifyContent: 'center',
        margin: rv(3),
        marginRight: rv(4),
        opacity: isCorrect === null && canClick ? 1 : isSelected ? 1 : 0.5,
        ...style,
      }}
      disabled={isCorrect !== null || !canClick}
    >
      <Text
        style={{
          color: (isCorrect && isSelected) ? "#48463E" : isSelected ? 'white' : '#48463E',
          textAlign: 'center',
          fontSize: rv(11),
          fontWeight: '600',
        }}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );
};

interface CreditsData {
  amount: number;
  // Add other properties if available
}
const Quiz = () => {

  const {
    data: quizData,
    isLoading,
    refetch: getNextQuestion,
    isFetching,
  } = useGetQuestions();


  const [data1, setData1] = useState<any>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const { mutate: changeUserPennytots } = useChangeUserPennytots();
  const [selectedOption, setSelectedOption] = useState(null);
  const [goToNext, setGoToNext] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<any>(null);
  const { data: credits, refetch } = useGetCredit();

  const [isCurrentSelectionCorrect, setIsCurrentSelectionCorrect] =
    useState<any>(null);
  const [showScoreMessage, setShowScoreMessage] = useState(false);
  const [image, setImage] = useState(null);
  const { question, options, answer: correctAnswer } = quizData || {};
  const [end, setEnd] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (credits?.amount <= 50) {
      navigation.navigate('Credits' as never );
    }
  }, []);
  // function to get random image
  const getRandomWrongImage = () => {
    const images = [Wrong1, Wrong2, Wrong3, Wrong4, Wrong5, Wrong6, Wrong7, Wrong8,Wrong9,Wrong10,Wrong11,Wrong12,Wrong13,Wrong14,Wrong15,Wrong16,Wrong17];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const getRandomCorrectImage = () => {
    const images = [Right1];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  // useEffect(() => {
  //   refetch() // Fetch the first question when the component mounts
  // }, [selectedOption,credits]);

  const handleOptionSelect = async (option: any) => {
    setSelectedOption(option);
    // Submit the selected option to the backend
    try {
      const isAnswerCorrect = option === correctAnswer;
      setIsCorrect(isAnswerCorrect);
      setTimeout(() => {
        setImage(null);
        setCanClick(true);
      }, 3000);
      setEnd(true);
      setShowScoreMessage(true);
      setTimeout(() => {
        setShowScoreMessage(false);
      }, 2500);
      if (isAnswerCorrect) {
        setGoToNext(true);
        setIsCurrentSelectionCorrect(true);
        setImage(getRandomCorrectImage());
        setScore(score + 25);
        await changeUserPennytots('increase');
        refetch();
      } else {
        setScore(score - 25);
        setImage(getRandomWrongImage());
        setCanClick(false);
        setTimeout(() => {
          setIsCorrect(null); // Hide the score message after 5 seconds
        }, 2500);
        await changeUserPennytots('reduce');
        refetch();
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setIsCurrentSelectionCorrect(true);
    }
  };

  const refresh = () => {

  }

  const handleNextQuestion = () => {
    setGoToNext(false);
    getNextQuestion(); // Refetch the mock data, replace it with your API call
    setEnd(false);
    setImage(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setIsCurrentSelectionCorrect(null);
  };

  const handleNavigateToChallengeMode = () => {
    navigation.navigate('ChallengeMode' as never);
};

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: rv(20) }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={handleNavigateToChallengeMode}>
          <Image
            source={require('app/assets/Bulb.png')}
            style={{ width: rv(16), height: rv(22) }}
          />
          <Text style={{ fontSize: rv(13), fontWeight: '600', color: '#4F4F4F',paddingLeft:rv(4) }}>
            Challenge Mode
          </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
          
        <Text
          style={{
            paddingRight: rv(4),
            fontSize: rv(13),
            fontWeight: '600',
            color: '#696969',
          }}
        >
          {credits?.amount}
        </Text>
      
            <Text style={{ fontSize: rv(13), fontWeight: '600', color: '#696969' }}>
              Pennytots
            </Text>
          </View>
          <View style={{ flexDirection: 'row', position: 'absolute', top: rv(22) }}>
            <Animatable.View animation='fadeIn' style={{ width: rv(25) }}>
              {showScoreMessage && (
                <Text style={{ color: isCorrect ? 'green' : 'red' }}>
                  {isCorrect ? '+50' : '-50'}
                </Text>
              )}
            </Animatable.View>
          </View>
        </View>
      </View>
      {isFetching && (
        <View style={{flexDirection:"row", justifyContent:"center", alignContent:"center"}}>
          {isFetching && (
            <Image source={Loading} style={{ width: 50, height: 50 }} />
          )}
          {/* Your content here */}
        </View>
      )}
      {!isFetching && (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginTop: 40,
              fontSize: rv(12),
              fontWeight: '700',
              fontStyle: 'normal',
              color: '#696969',
            }}
          >
            {quizData?.question}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: 40,
            }}
          >
            {options?.map((option, index) => (
              <OptionButton
                key={index}
                option={option}
                onPress={() => handleOptionSelect(option)}
                isSelected={selectedOption === option}
                isCorrect={isCurrentSelectionCorrect}
                canClick={canClick}
                style={{ width: '45%', marginBottom: 24 }} // Adjust the width as needed
              />
            ))}
          </View>
          <Animation image={image} end={end} />
        </View>
      )}

      {goToNext && (
        <TouchableOpacity
          style={{ position: 'absolute', bottom: rv(20), right: rv(20) }}
          onPress={handleNextQuestion}
        >
          {/* Add your arrow icon here */}
          <FloatingAddSVG width={rv(55)} height={rv(55)} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Quiz;
