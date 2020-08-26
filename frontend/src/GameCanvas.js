import React, { useState } from "react";
import { Stage, Layer, Group, Text, Rect } from "react-konva";
import { sampleSize } from "lodash";
import ShowCorrectWrong from "./components/ShowCorrectWrong";
import BackGround from "./components/Background";
import getVowels from "./utils/getVowels";
import getWords from "./utils/getWords";
import checkChoice from "./utils/checkChoice";
import GameCover from "./components/GameCover";
import GameResult from "./components/GameResult";
import API from "./utils/API";
//generate Game ID when start. Use Game ID to join game
//database: Game: ID, player1ID, player1score, player2ID, player2score
//use websocket to update score.
export default ({isStarted,
                  score1,
                  score2,
                  player1name,
                  player2name,
                  username,
                  timeRemain,
                  gameId
                }) => {
  const [word, setWord] = useState("read");
  const [choices, setChoices] = useState(["i", "ɪ", "ʌ", "ɛ", "ʊ"]);
  const [choiceFills, setChoiceFills] = useState([
    "white",
    "white",
    "white",
    "white",
    "white"
  ]);
  const [hideCorrectWrong, setHideCorrectWrong] = useState(true);
  const words = getWords();
  const vowels = getVowels();
  const [isChoiceCorrect, setIsChoiceCorrect] = useState(true);
  function updateQuestion() {
    setWord(words.pop());
    setChoices(sampleSize(vowels, 4));
  }
  function updateStateArray(arr, idx, newVal) {
    let copy = [...arr];
    copy[idx] = newVal;
    switch (arr) {
      case choiceFills:
        setChoiceFills(copy);
        break;
      case choices:
        setChoices(copy);
        break;
      default:
        break;
    }
  }
  function choiceHover(idx) {
    document.body.style.cursor = "pointer";
    updateStateArray(choiceFills, idx, "Moccasin");
  }
  function choiceExitHover(idx) {
    document.body.style.cursor = "default";
    updateStateArray(choiceFills, idx, "white");
  }
  function checkAnswer(choiceIdx) {
    const noCorrectAnswer = choices.every(choice => !checkChoice(choice, word));
    if (noCorrectAnswer && choiceIdx === 4) {
      return true;
    } else {
      return choiceIdx === 4 ? false : checkChoice(choices[choiceIdx], word);
    }
  }
  function handleChoiceClick(idx) {
    const isCorrect = checkAnswer(idx);
    setIsChoiceCorrect(isCorrect);
    updateStateArray(choiceFills, idx, isCorrect ? "Lime" : "OrangeRed");
    setHideCorrectWrong(false);
    setTimeout(() => setHideCorrectWrong(true), 3000);
    updateQuestion();
    if (isCorrect) {
      console.log("updating score");
      let myNewScore = (username===player1name)?score1+1:score2+1;
      if(username===player1name){
        API.patch(`games/${gameId}/`,{
          score1:myNewScore
        }).then(res=>{
          console.log("updating score");
          console.log(res);
        }).catch(err=>console.log(err))
      }
      else{
        API.patch(`games/${gameId}/`,{
          score2:myNewScore
        }).then((res)=>{
          console.log("updating score");
          console.log(res);
        }).catch(err=>console.log(err))
      }
    }
  }

  return (
    <Stage width={500} height={500}>
      <Layer>
        <BackGround />
      </Layer>
      <Layer visible={!isStarted}>
        <GameCover />
      </Layer>
      <Layer visible={isStarted}>
        <Group
          onMouseOver={() => choiceHover(0)}
          onMouseOut={() => choiceExitHover(0)}
          onClick={() => handleChoiceClick(0)}
        >
          <Rect
            x={60}
            y={350}
            width={70}
            height={40}
            stroke="black"
            strokeWidth={4}
            opacity={0.8}
            fill={choiceFills[0]}
          />
          <Text
            id="choice1"
            fontFamily="Helvetica"
            x={90}
            y={358}
            fontSize={30}
            text={choices[0]}
          />
        </Group>
        <Group
          onMouseOver={() => choiceHover(1)}
          onMouseOut={() => choiceExitHover(1)}
          onClick={() => handleChoiceClick(1)}
        >
          <Rect
            x={170}
            y={350}
            width={70}
            height={40}
            stroke="black"
            strokeWidth={4}
            opacity={0.8}
            fill={choiceFills[1]}
          />
          <Text
            id="choice2"
            fontFamily="Helvetica"
            x={200}
            y={358}
            fontSize={30}
            text={choices[1]}
          />
        </Group>
        <Group
          onMouseOver={() => choiceHover(2)}
          onMouseOut={() => choiceExitHover(2)}
          onClick={() => handleChoiceClick(2)}
        >
          <Rect
            x={280}
            y={350}
            width={70}
            height={40}
            stroke="black"
            strokeWidth={4}
            opacity={0.8}
            fill={choiceFills[2]}
          />
          <Text
            id="choice3"
            fontFamily="Helvetica"
            x={310}
            y={358}
            fontSize={30}
            text={choices[2]}
          />
        </Group>
        <Group
          onMouseOver={() => choiceHover(3)}
          onMouseOut={() => choiceExitHover(3)}
          onClick={() => handleChoiceClick(3)}
        >
          <Rect
            x={390}
            y={350}
            width={70}
            height={40}
            stroke="black"
            strokeWidth={4}
            opacity={0.8}
            fill={choiceFills[3]}
          />
          <Text
            fontFamily="Helvetica"
            x={420}
            y={358}
            fontSize={30}
            text={choices[3]}
          />
        </Group>
        <Group
          onMouseOver={() => choiceHover(4)}
          onMouseOut={() => choiceExitHover(4)}
          onClick={() => handleChoiceClick(4)}
        >
          <Rect
            x={140}
            y={410}
            width={225}
            height={35}
            stroke="black"
            strokeWidth={4}
            opacity={0.8}
            fill={choiceFills[4]}
          />
          <Text
            fontFamily="Helvetica"
            x={150}
            y={416}
            fontSize={25}
            text={"None of the above"}
          />
        </Group>
        <Text x={210} y={200} fontSize={50} text={word} />
        <Text
          x={300}
          y={10}
          fontSize={20}
          text={`${player1name !== ""?player1name:"Player1"} Score: ` + score1}
        />
        <Text
          x={300}
          y={40}
          fontSize={20}
          text={`${player2name !== ""?player2name:"Player2"} Score: ` + score2}
        />
        <ShowCorrectWrong isCorrect={isChoiceCorrect} hide={hideCorrectWrong} />
      </Layer>
      <Layer visible={isStarted && timeRemain === 0}>
        <GameResult isWin={(username===player1name)?score1>score2:score2>score1} />
      </Layer>
    </Stage>
  );
};
