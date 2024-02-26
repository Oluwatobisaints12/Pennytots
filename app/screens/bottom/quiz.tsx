import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

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
import { navigate } from 'app/navigation/root';

import ChallengeMode from './challengeMode';

const Correct = require('../../assets/gifs/correct.gif');
const Wrong1 = require('../../assets/gifs/wrong1.gif');
const Wrong2= require('../../assets/gifs/wrong2.gif');
const Wrong3 = require('../../assets/gifs/wrong3.gif');
const Wrong4 = require('../../assets/gifs/wrong4.gif');
const Wrong5 = require('../../assets/gifs/wrong5.gif');
const Wrong6 = require('../../assets/gifs/wrong6.gif');
const Wrong7 = require('../../assets/gifs/wrong7.gif');
const Wrong8 = require('../../assets/gifs/wrong8.gif');

const RandomImageAnimation = ({ images }: { images: any[] }) => {
  // If 'images' prop is falsy or empty, return null to not render anything
  if (!images || images.length === 0) {
    return null;
  }

  // Select a random image from the array
  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];}

const mockQuizData = {
  question: 'What is the capital of France?',
  options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
  correctAnswer: 'Paris',
};

const OptionButton = ({
  option,
  onPress,
  isCorrect,
  isSelected,
  style,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: isSelected ? 'black' : 'white',
        height: 55,
        marginTop: 27,
        marginBottom: 20,
        borderRadius: 30,
        padding: 7,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        marginRight: 4,
        opacity: isCorrect === null ? 1 : isSelected ? 1 : 0.5,
        ...style,
      }}
      disabled={isCorrect !== null}
    >
      <Text
        style={{
          color: isSelected ? 'white' : 'black',
          textAlign: 'center',
          fontSize: 14,
        }}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );
};

const Quiz = () => {
  const { data: quizData, isLoading, refetch: getNextQuestion } = useGetQuestions();
  const {  mutate: changeUserPennytots} = useChangeUserPennytots()
  const [selectedOption, setSelectedOption] = useState(null);
  const [goToNext, setGoToNext] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<any>(null);
  const { data: credits, refetch } = useGetCredit();
  const [isCurrentSelectionCorrect, setIsCurrentSelectionCorrect] = useState<any>(null);
  const [showScoreMessage, setShowScoreMessage] = useState(false);
  const [image, setImage] = useState(null);
  const { question, options, answer: correctAnswer } = quizData || {};
  const [end, setEnd] = useState(false);
  const navigation = useNavigation();

  // function to get random image
  const getRandomImage = () => {
    const images = [Wrong1, Wrong2, Wrong3, Wrong4, Wrong5, Wrong6, Wrong7, Wrong8];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  useEffect(() => {
    getNextQuestion(); // Fetch the first question when the component mounts
  }, []);

  const handleOptionSelect = async (option: any) => {
    setSelectedOption(option);
    // Submit the selected option to the backend
    try {
      const isAnswerCorrect = option === correctAnswer;
      setIsCorrect(isAnswerCorrect);
      setTimeout(() => {
          setImage(null);
        }, 3000);
      setEnd(true);
      setShowScoreMessage(true);
      setTimeout(() => {
        setShowScoreMessage(false);
      }, 2500);
      if (isAnswerCorrect) {
        setImage(Correct);
        setScore(score + 10);
        changeUserPennytots('increase')
        setIsCurrentSelectionCorrect(true);
        setGoToNext(true);
      } else {
        setScore(score - 10);
        setImage(getRandomImage());
        changeUserPennytots('reduce')
        setTimeout(() => {
          setIsCorrect(null); // Hide the score message after 5 seconds
        }, 2500);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setIsCurrentSelectionCorrect(true);
    }
  };
  const handleImageError = (error: any) => {
    console.error('Error loading image:', error);
    // Handle the error, such as displaying a placeholder image or showing an error message
  };


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
    navigation.navigate('ChallengeMode');
};
    

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginBottom: 51 }}>
     
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={handleNavigateToChallengeMode}>
        <Image
              source={require('app/assets/quizinchall.png')}
              style={{ width: 25.48, height: 30.99, marginRight: 2.49 }}
            />
        <Text style={{ fontSize: 14, fontWeight: 'bold', color:'#4F4F4F' }}>Challenge Mode</Text>

        </TouchableOpacity>
        <View style={{marginLeft: 125}}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{paddingRight: 5, fontSize: 14, fontWeight: 'bold'}}>{credits?.amount}</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Pennytots</Text>
          </View>
          
         
     
        </View>
        <View >
          {showScoreMessage && (
            <Animatable.View animation="fadeIn">
              <Text style={{ color: isCorrect ? 'green' : 'red' }}>
                {isCorrect ? '+10' : '-10'}
              </Text>
            </Animatable.View>
          )}
          </View>
      </View>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && (
         <Text>{question}</Text>
      )}
     

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {options?.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            onPress={() => handleOptionSelect(option)}
            isSelected={selectedOption === option}
            isCorrect={isCurrentSelectionCorrect}
            style={{ width: '45%' }} // Adjust the width as needed
          />
        ))}
      </View>
      <Animation image={image} end={end}/>

      {goToNext && (
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 20, right: 20 }}
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
