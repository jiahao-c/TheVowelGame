import React, {useState, useEffect} from "react";
import GameCanvas from "./GameCanvas";
import Menu from "./components/Menu";
import useWebSocket from "react-use-websocket";

export default props => {
    const [username, setUsername] = useState("You're not Logged in");
    const [gameId, setGameId] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [player1name, setPlayer1name] = useState("");
    const [score1, setScore1] = useState(0);
    const [player2name, setPlayer2name] = useState("")
    const [score2, setScore2] = useState(0);
    const [timeRemain, setTimeRemain] = useState(30);

    //websocket listening for updates
    const socketUrl = 'ws://127.0.0.1:8000/ws/game/';

    const {
        sendJsonMessage,
        lastJsonMessage,
    } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened websocket connection'),
        shouldReconnect: (closeEvent) => true,
    });
    useEffect(() => {
        if (lastJsonMessage) {
            if (lastJsonMessage.action === "update") {
                console.log("received json message:");
                console.log(lastJsonMessage);
                const newGameState = lastJsonMessage.data;
                if (newGameState.player1name !== player1name){
                    setPlayer1name(newGameState.player1name);
                }
                if (newGameState.player2name !== player2name) {
                    setPlayer2name(newGameState.player2name);
                    setIsStarted(true);
                }
                if (newGameState.score1 !== score1) {
                    setScore1(newGameState.score1);
                }
                if (newGameState.score2 !== score2) {
                    setScore2(newGameState.score2);
                }
            } else if (lastJsonMessage.action === "subscribe_instance") {
                if (lastJsonMessage.response_status === 201) {
                    console.log("subscribed game successfully");
                } else if (lastJsonMessage.response_status === 404) {
                    console.log("game id not found");
                }
            } else if (lastJsonMessage.action === "unsubscribe_instance") {
                if (lastJsonMessage.response_status === 201) {
                    console.log("unsubscribed game successfully");
                } else if (lastJsonMessage.response_status === 404) {
                    console.log("game id not found");
                }
            }
        }
    }, [lastJsonMessage, setPlayer2name, score1, player2name, score2])
    return (
        <div>
            <Menu
                isStarted={isStarted}
                setIsStarted={setIsStarted}
                timeRemain={timeRemain}
                setTimeRemain={setTimeRemain}
                player1name={player1name}
                setPlayer1name={setPlayer1name}
                player2name={player2name}
                setPlayer2name={setPlayer2name}
                username={username}
                setUsername={setUsername}
                sendJsonMessage={sendJsonMessage}
                gameId={gameId}
                setGameId={setGameId}
            />
            <GameCanvas
                isStarted={isStarted}
                score={player1name === username ? score1 : score2}
                timeRemain={timeRemain}
                gameId={gameId}
                player1name={player1name}
                player2name={player2name}
                score1={score1}
                score2={score2}
                username={username}
            />
        </div>
    );
};
