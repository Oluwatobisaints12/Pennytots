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
const Correct = require("../../assets/gifs/correct.gif");
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
        backgroundColor: isSelected ? "black" : "white",
        height: 55,
        marginTop: 24,
        marginBottom: 10,
        borderRadius: 30,
        padding: 7,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center",
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
          fontSize: 14,
        }}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );
};

const GameMode = () => {
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
  const { data: credits, refetch } = useGetCredit();
  const [isCurrentSelectionCorrect, setIsCurrentSelectionCorrect] = useState<any>(null);
  const [showScoreMessage, setShowScoreMessage] = useState(false);
  const [image, setImage] = useState(null);
  const { question, options, answer: correctAnswer } = quizData || {};
  const [end, setEnd] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown
  const [questionNumber, setQuestionNumber] = useState(1); // Initialize question number to 1

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0 || isCurrentSelectionCorrect === false) {
          clearInterval(timer); // Stop the timer when time reaches 0 or isCurrentSelectionCorrect is false
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [isCurrentSelectionCorrect]);
  

  // Effect to navigate when time is up
  useEffect(() => {
    if (timeLeft === 0) {
      setImage(Wrong1); // Assuming Wrong1 is the image you want to display
      setShowScoreMessage(true);
    }
  }, [timeLeft]);
  
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const navigation = useNavigation();
  const handleNavigateToQuiz = () => {
   
    
    navigation.navigate('QuizScreen' as never)

   

  
};
  // function to get random image
  const getRandomImage = () => {
    const images = [
      Wrong1,
     
    ];

  };

  useEffect(() => {
    getNextQuestion(); // Fetch the first question when the component mounts
  }, []);

  const handleOptionSelect = async (option: any) => {
    if (timeLeft === 0) {
      return;
    }
    setSelectedOption(option);
    const isCorrect = option === correctAnswer;

    // If the selected option is correct, increase the question number by 1
    if (isCorrect) {
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    }
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
        style={{ flexDirection: "column", justifyContent: "space-between" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
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
            <Text style={{ fontWeight: "bold", fontFamily: 'extraBold' }}>{text}</Text>
            <Text style={{ fontWeight: "bold" }}> Staked</Text>
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 32}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', lineHeight: 24}}>Questiion {questionNumber}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require("app/assets/timesquare.png")}
              style={{ width: 21, height: 21, marginRight: 8 }}
            />
              <Text style={{fontWeight: 'bold', fontSize: 16, color: '#797978'}}>{formatTimeLeft()}</Text>
            </View>
          </View>
         <View style={{marginTop: 27}}>
         {showScoreMessage && (
            <Animatable.View animation="fadeIn">
              <Text style={{ color: isCorrect ? "green" : "red" }}>
                {isCorrect ? "+10" : "-10"}
              </Text>
            </Animatable.View>
          )}
         </View>
        </View>
      </View>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && <Text>{question}</Text>}

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
      {isCorrect && (
  <Animation image={image} end={end}/>
)}
      {timeLeft === 0 && (
      <View style={{ alignItems: 'center', }}>
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
            <Text style={{ fontWeight: '500', fontSize: 16, color: '#48463E', lineHeight: 24, fontFamily: 'extraBold', }}>Back to Game Mode</Text>
          </View>
        </TouchableOpacity>
      </View>
    )}

      {isCurrentSelectionCorrect === false && (
  <View style={{ alignItems: 'center', marginTop: 27 }}>
    {image && ( // Conditionally render the image only if it exists
      <View style={styles.container}>
        <Image source={image} style={styles.imageStyle} />
      </View>
    )}
    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#797978', lineHeight: 36, marginTop: 27, fontFamily: 'extraBold',}}>CHALLENGE OVER!</Text>
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
        <Text style={{ fontWeight: '500', fontSize: 16, color: '#48463E', lineHeight: 24 }}>Back to Game Mode</Text>
      </View>
    </TouchableOpacity>
  </View>
)}

{/* Remove the Animation component */}


      {goToNext && (
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
