

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

const getPlayerIndex =  (type,index,amountOfCards) => {
  switch(type){
    case "back": 
      if (index === 0) return amountOfCards-1; 
      else return index-1; 
    break; 
    case "front": 
      if (index === amountOfCards-1) return 0; 
      else return index+1; 
    break; 
  }
}

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

function mainStyle (display,player1Index,player2Index) {

  const checkForNpc = (player1Index,player2Index) => {
    
    if (player1Index === 0 && player2Index === 0) return null; 
    else return true; 
  }
  const npc = checkForNpc(player1Index,player2Index);

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

  const [player1Index,setPlayer1Index] = React.useState(0); 
  const [player2Index,setPlayer2Index] = React.useState(0); 
  const [playerCards,setPlayerCards] = React.useState([
   [
    {

      type:"Player", 
      img: "./assets/Player.png", 
      name: "Player name", 
      
    },
    {
      type:"Easy", 
      img:"./assets/EasyNpc.png", 
      name: "Easy"
    },
    {
      type:"Normal",
      img:"./assets/NormalNpc.png",  
      name: "Normal"
    },

    {
      type:"Hard", 
      img:"./assets/HardNpc.png", 
      name: "Hard", 
    }
   ],
   [
      {

        type:"Player", 
        img: "./assets/Player.png", 
        name: "Player name", 
    
      },
      {
        type:"Easy", 
        img:"./assets/EasyNpc.png", 
        name: "Easy"
      },
      {
        type:"Normal",
        img:"./assets/NormalNpc.png",  
        name: "Normal"
      },

      {
        type:"Hard", 
        img:"./assets/HardNpc.png", 
        name: "Hard", 
      }
   ]

    
  ]);
  const player1 = playerCards[0][player1Index].name;
  const player2 = playerCards[1][player2Index].name;

  const [display,setDisplay] = React.useState("playerMenu");  
  const [boardSize, setBoardSize] = React.useState(5);
  const toWin = calcToWin(boardSize); 
  const [error,setError] = React.useState(null); 


  const changePlayerIndex = (btnPressed) => {
    let newIndex; 
    switch (btnPressed) {
      case "player1Next":  
        newIndex = getPlayerIndex("front",player1Index,playerCards[0].length)
        setPlayer1Index(newIndex); 
      break; 
      case "player1Prev": 
        newIndex = getPlayerIndex("back",player1Index,playerCards[0].length)
        setPlayer1Index(newIndex); 
      break; 
      case "player2Next": 
        newIndex = getPlayerIndex("front",player2Index,playerCards[1].length)
        setPlayer2Index(newIndex);
      break; 
      case "player2Prev":
        newIndex = getPlayerIndex("back",player2Index,playerCards[1].length)
        setPlayer2Index(newIndex); 
      break; 
    }
  }

  const changePlayerName = (type,value) => {
    if (type === "player1"){
      setPlayerCards(prev =>
        prev.map((arr, arrIndex) =>
          arrIndex === 0 ? 
            arr.map((card, cardIndex) =>
              cardIndex === player1Index ?
                { ...card, name: value }
                : card
              )
          : arr
        )
      );
    } else if (type === "player2") {
      setPlayerCards(prev => 
        prev.map((arr,arrIndex) =>
          arrIndex === 1 ?
            arr.map((card,cardIndex) => 
              cardIndex === player2Index ? 
              {...card,name:value}
            : card
          )                  
          : arr
        )
      )
    }

    
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
        return <PlayerMenu playerCards = {playerCards} changePlayerName = {changePlayerName} changePlayerIndex ={changePlayerIndex} player1Index={player1Index} player2Index={player2Index} />
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
    
    
    <div className = "main" style={mainStyle(display,player1Index,player2Index)}> 
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