import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

import axios from "axios";
import * as Animatable from "react-native-animatable";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  useGetCredit,
  useGetCreditTransactionHistory,
} from "app/redux/credit/hook";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingAddSVG from "app/assets/svg/next.svg";
import { responsiveValue as rv } from "app/providers/responsive-value";
import Animation from "app/components/animation";
import { useGetQuestions, useChangeUserPennytots } from "app/redux/quiz/hook";
import { navigate } from "app/navigation/root";
import Quiz from "./quiz";
const Correct = require("../../assets/gifs/correct1.gif");
const Wrong1 = require("app/assets/times-up.png");


const RandomImageAnimation = ({ images }: { images: any[] }) => {
  // If 'images' prop is falsy or empty, return null to not render anything
  if (!images || images.length === 0) {
    return null;
  }

  // Select a random image from the array
  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];
};

const mockQuizData = {
  question: "Who is known as the pioneer of Afrobeat music in Nigeria??",
  options: ["Ebenezer Obey", "Fela Kuti", "Ebenezer Obey", "Ebenezer Obey"],
  correctAnswer: "Fela Kuti",
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
        backgroundColor: (isCorrect && isSelected) ? "#FFC085" : isSelected ? '#48463E' : '#FED830',
        height: 64,
        
        marginTop: 24,
        marginBottom: 20,
        borderRadius: 24,
        padding: 7,
        paddingHorizontal: 30,
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
          color: isSelected ? "white" : "black",
          textAlign: "center",
          fontSize: 13,
          fontWeight: '600',
        }}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );
};

const GameMode = () => {
  const [questionNumber, setQuestionNumber] = useState(1)


  const route = useRoute();

  // Access the 'text' parameter from the route params
  const { text } = route.params;
  const {
    data: quizData,
    isLoading,
    refetch: getNextQuestion,
  } = useGetQuestions();
  
  const { mutate: changeUserPennytots } = useChangeUserPennytots();
  const [selectedOption, setSelectedOption] = useState(null);
  const [goToNext, setGoToNext] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<any>(null);
  const { data: credits, refetch} = useGetCredit(); // Destructure setCredits

  const [isCurrentSelectionCorrect, setIsCurrentSelectionCorrect] = useState<any>(null);
  const [showScoreMessage, setShowScoreMessage] = useState(false);
  const [image, setImage] = useState(null);
  const { question, options, answer: correctAnswer } = quizData || {};
  const [end, setEnd] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); 
  const [gameOver, setGameOver] = useState(false)
  const [gameWin, setGameWin] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [updatedAmount, setUpdatedAmount] = useState(null); // Define updatedAmount in the component's state

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);


  useEffect(()=>{
     if (timeLeft === 0){
      setGameOver(true)
     }
  }, [timeLeft])

  useEffect(()=>{
    if(isCurrentSelectionCorrect === false){
      setGameOver(true)
    }
  }, [isCurrentSelectionCorrect])

 
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0 || gameOver || gameWin) {
          clearInterval(timer); // Stop the timer when time reaches 0 or gameOver is true
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    // Cleanup function to clear the interval when the component unmounts or when the game is over
    return () => clearInterval(timer);
  }, [gameOver, gameWin]); // Include gameOver in the dependency array
  

  // Effect to navigate when time is up
  useEffect(() => {
    if (timeLeft === 0) {
      setImage(Wrong1); // Assuming Wrong1 is the image you want to display
      setShowScoreMessage(true);
    }
  }, [timeLeft]);
  
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60) ;
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const navigation = useNavigation();
  const handleNavigateToQuiz = () => {
   
    
    navigation.navigate('QuizScreen' as never)

   

  
};
const handleNavigateChallenge = () => {
  navigation.navigate('ChallengeMode',  {gameWin: true}); // Ensure that 'gameWin' is passed correctly
};


  // function to get random image
  const getRandomImage = () => {
    const images = [
      Wrong1,
     
    ];

  };


  useEffect(() => {
    if (questionCount >= 1 && isCurrentSelectionCorrect) {
      setGameWin(true);
      
    } 
  }, [questionCount, isCurrentSelectionCorrect]);
  
  useEffect(() => {
    const updateCredits = async () => {
      if (gameWin && credits) { // Check if gameWin is true and credits exists
        try {
          const updatedAmount = credits.amount + 500; // Add 500 to the current amount
          await changeUserPennytots(updatedAmount); // Update the user's pennytots with the new amount
          await refetch(); // Refetch the data
        } catch (error) {
          // Handle errors if necessary
          console.error('Error updating credits:', error);
        }
      }
    };

    updateCredits();
  }, [gameWin, credits, refetch]);
 
 
  
  const handleOptionSelect = async (option: any) => {
      // getNextQuestion(); // Fetch the next question
      
     
      
    
      
    if (timeLeft === 0) {
      return;
    }
    setSelectedOption(option);
    const isCorrect = option === correctAnswer;

    // If the selected option is correct, increase the question number by 1
  
    // Submit the selected option to the backend
    try {
      const isAnswerCorrect = option === correctAnswer;
      setIsCorrect(isAnswerCorrect);
     
      setEnd(true);
      setShowScoreMessage(true);
      setTimeout(() => {
        setShowScoreMessage(false);
      }, 2500);
      if (isAnswerCorrect) {
        setImage(Correct);
        setScore(score + 10);
        changeUserPennytots("increase");
        setIsCurrentSelectionCorrect(true);
        setGoToNext(true);
      } else {
        setScore(score - 10);
        changeUserPennytots("reduce");
        setIsCurrentSelectionCorrect(false);
        setImage(Wrong1);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setIsCurrentSelectionCorrect(true);
    }
  };
  const handleImageError = (error: any) => {
    console.error("Error loading image:", error);
    // Handle the error, such as displaying a placeholder image or showing an error message
  };

  const handleNextQuestion = () => {
     if(questionCount >=29 && isCurrentSelectionCorrect){
      return;
     }

    setQuestionCount((prevCount)=>
      prevCount +1
    )

    if (isCorrect ) {
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    }
    
    if (timeLeft === 0) {
      return;
    }
    setGoToNext(false);
    getNextQuestion(); // Refetch the mock data, replace it with your API call
    setEnd(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setIsCurrentSelectionCorrect(null);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}
    >


      <View
        style={{ flexDirection: "column", justifyContent: "space-between",marginTop: rv(20) }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleNavigateToQuiz} style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("app/assets/Vector.png")}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#4F4F4F" }}
            >
              Back to Game Mode
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontFamily: 'semiBold' ,color: '#4F4F4F'}}>{text}</Text>
            <Text style={{ fontFamily: 'semiBold',color: '#4F4F4F'}}> Staked</Text>
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 32}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', lineHeight: 24}}>Question {questionNumber}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require("app/assets/timesquare.png")}
              style={{ width: 21, height: 21, marginRight: 8 }}
            />
              <Text style={{fontWeight: 'bold', fontSize: 16, color: '#797978'}}>{formatTimeLeft()}</Text>
            </View>
          </View>
         
        </View>
      </View>
      {questionCount <= 2 && (
  <View>
    {isLoading && <Text>Loading...</Text>}
    {!isLoading && <Text>{quizData?.question}</Text>}
  </View>
)}


      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {options?.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            onPress={() => handleOptionSelect(option)}
            isSelected={selectedOption === option}
            isCorrect={isCurrentSelectionCorrect}
            style={{ width: "45%" }} // Adjust the width as needed
          />
        ))}
      </View>
     {!gameWin && isCorrect && (
      <Animation image={image} end={end} />
    )}
   {(gameOver) && (
  <View style={{ alignItems: 'center', marginTop: 27 }}>
    <View style={styles.container}>
      <Image source={Wrong1} style={styles.imageStyle} /> 
    </View>
    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#797978', lineHeight: 36, marginTop: 27}}>CHALLENGE OVER!</Text>
    {/* Render a button to continue */}
    <TouchableOpacity onPress={handleNavigateToQuiz} style={{ marginTop: 39 }}>
      <View style={{
        padding: 10,
        backgroundColor: '#FED830',
        borderRadius: 32,
        width: 364,
        height: 48, 
        paddingVertical: 12, // padding vertical
        paddingHorizontal: 8, // padding horizontal
        justifyContent: 'center', // center vertically
        alignItems: 'center' // center horizontally
      }}>
        <Text style={{  fontSize: rv(14), color: '#48463E', lineHeight: 24, fontFamily: 'regular', }}>Back to Game Mode</Text>
      </View>
    </TouchableOpacity>
  </View>
)}

{gameWin && (
  <View style={{ alignItems: 'center', marginTop: 27 }}>
    <View style={styles.container}>
      <Image source={Wrong1} style={styles.imageStyle} /> 
    </View>
    <TouchableOpacity onPress={handleNavigateChallenge} style={{ marginTop: 39 }}>
      <View style={{
        padding: 10,
        backgroundColor: '#FED830',
        borderRadius: 32,
        width: 364,
        height: 48, 
        paddingVertical: 12,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: rv(14), color: '#48463E', lineHeight: 24, fontFamily: 'regular' }}>Try Again</Text>
        {updatedAmount !== null && (
          <Text style={{ fontSize: rv(14), color: '#48463E', lineHeight: 24, fontFamily: 'regular' }}>
            Updated Score: {updatedAmount}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  </View>
)}





{/* Remove the Animation component */}


      {!gameWin && goToNext && (
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
          }}
          onPress={handleNextQuestion}
        >
          <View
            style={{
              padding: 18,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FED830",
              width: 162,
              height: 54.18,
              borderRadius: 32,
            }}
          >
            <Image
              source={require("app/assets/arrow.png")}
              style={{ width: 24, height: 24, marginTop: 10 }}
            />
            <Text>Next question</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    marginTop: 57,
    width: 277, // Set width as needed
    height: 156, // Set height as needed
    // Add more styles as needed
  },
});



export default GameMode;
