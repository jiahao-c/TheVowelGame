type gameState = {
    "id": number,
    "player1name": string,
    "player2name": string | null,
    "time":string,
    "ended": boolean,
    "score1": number,
    "score2": number,
    "player1": number,
    "player2": number | null,
};
type filterType = (gameStates : gameState[], username:string) => gameState[];
const filterGameHistory : filterType = (gameStates:gameState[], username:string)=>
    gameStates.filter((game:gameState) : boolean =>
        game.player1name === username || game.player2name === username
    )

export default filterGameHistory;