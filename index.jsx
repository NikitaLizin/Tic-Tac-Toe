const app = document.querySelector("#root"); 
const root = ReactDOM.createRoot(app); 
let messageToSend = null; 

// 3x3 3 in a row. 
// 4x4 4 in a row. 
// 5x5 4 in a row. 
// 6x6 5 in a row.  
// 7x7 5 in a row 
// 8x8 6 in a row. 
// 9x9 6 in a row.
// 10x10 6 in a row. 


const choseMenuType =  (mode,difficulty,boardSize) => {
  
  if (!mode) return "Mode"; 
  else if (!difficulty) return "Difficulty"; 
  else if (!boardSize) return "SetupBoard"; 

}

const buttonContent =  (btn) => {
  switch(btn){
    case "playerMenu": 
      return "Pick Players"; 
    break; 
    case "boardMenu": 
      return "Pick board"; 
    break; 
    case "modeMenu": 
      return "Pick mode"; 
    break; 
    case "game": 
      return "Start game"; 
    break; 
  }
}

const calcToWin = (boardSize) => {
  if (boardSize === 3) return 3;
  else if (boardSize > 3 && boardSize < 6) return 4; 
  else if (boardSize > 5 && boardSize < 8) return 5; 
  else if (boardSize > 7) return 6;  
}

function mainStyle (display,player1,player2) {

   
  const checkForNpc = (player1,player2) => {
    const arr = ["Easy","Normal","Hard"];
    if (arr.includes(player1)) return true; 
    else if (arr.includes(player2)) return true; 
    else return null; 
  }

  const npc = checkForNpc(player1,player2);

  if (display === "game" && npc != null) {
    return {
      display: "grid", 
      gridTemplateColumns:"100%",
      gridTemplateRows:"80% 20%", 
      gridTemplateAreas:'"content"' + '"footer"',  
    }
  } else if (display === "game" && !npc) {
    return {
      display: "grid", 
      gridTemplateColumns:"100%",
      gridTemplateRows:" 20% 80%", 
      gridTemplateAreas:'"header"' +  '"content"',  
    }
  } 
  else {
    return {
      display: "grid", 
      gridTemplateColumns:"100%",
      gridTemplateRows:" 15% 85%", 
      gridTemplateAreas:'"header"' +  '"content"',  
    }
  }

}

function checkForDoubbleNPC (player1,player2) {
  const arr = ["Easy","Normal","Hard"];
  const player_1 = arr.includes(player1)
  const player_2 = arr.includes (player2);

  if (player_1 && player_2) return true; 
  else return null; 

}


function Main () { 


  const [mode, setMode] = React.useState(null); 
  const [player1,setPlayer1] = React.useState("Pall"); 
  const [player2,setPlayer2] = React.useState("Nikk"); 
  const [display,setDisplay] = React.useState("modeMenu");  
  const [boardSize, setBoardSize] = React.useState(5);
  const toWin = calcToWin(boardSize); 
  const [error,setError] = React.useState(null); 




  const setPlayer = (type,value) => {
    if (type === "player1") setPlayer1(value); 
    else if (type ==="player2") setPlayer2(value);   
  }
  
  const handleClick = (e) => {

    const btnPressed = e.target.value; 
    setDisplay(btnPressed); 
   
    
    

  }
  
  const  changeMode = (value) => {
    
    setMode(value); 

  }

  const changeBoardSize = (value) =>{
    setBoardSize(value)
  }

  const closeError = () => {
    setError(null); 
  }; 

  const startGame = () => {

    if (!mode) setError("no mode");
    else if (checkForDoubbleNPC(player1,player2)) {setError("doubble npc"); setDisplay("playerMenu")}
    else setDisplay("game"); 
  }


  const showDisplay = () => {
    switch(display) {
      case "playerMenu": 
        return <PlayerMenu setPlayer = {setPlayer} player1={player1} player2={player2} />
      break; 
      case "modeMenu": 
        return <ModeMenu changeMode={changeMode} currentMode = {mode} />
      break; 
      case "boardMenu": 
        return <BoardSettings boardSize={boardSize} changeBoardSize = {changeBoardSize} />
      break; 
      case "game": 
        return <Game boardSize = {boardSize} mode = {mode} player1 = {player1} player2 = {player2} exitGame = {exitGame} toWin = {toWin} /> 
      break; 
    }
  }

  const showBtn = () => {
    const Allbuttons = ["playerMenu", "modeMenu", "boardMenu","game"];
    const showButtons = Allbuttons.filter((button) => {
      return button != display; 
    }); 
    return showButtons; 
  }

  const exitGame = () => {
    setDisplay("playerMenu"); 
  }
  

  return (
    
    
    <div className = "main" style={mainStyle(display,player1,player2)}> 
      {showDisplay()}
      { error && <MessageBox error={error} closeError = {closeError}  />}
      

      { 
        display != "game" && 
        <div className = "menuBtnContainer">
          {showBtn().map((btn) => {
            return( 
              <button 
                key={btn} 
                className={btn != "game" ? "menuBtn" : "menuBtn startGameBtn"} 
                value={btn} 
                onClick={btn === "game"? startGame : handleClick} > 
                {buttonContent(btn)} 
              </button>
            )
          })}
        </div>
      }

    </div>
  )
}





root.render(<Main/>); 