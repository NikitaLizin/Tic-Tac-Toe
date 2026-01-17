

const calcIndex =  (type,index) => {
  switch(type){
    case "back": 
      if (index === 0) return playerCards.length-1; 
      else return index-1; 
    break; 
    case "front": 
      if (index === playerCards.length-1) return 0; 
      else return index+1; 
    break; 
  }
}

const cardStyle = (margin,cardValue,index) => {
  
  if (cardValue === index) {
    return {
      zIndex:"2",
      margin:"0px",     
      transform: "rotateY(0deg) scale(1.05 ,1.15)",
      opacity:"1", 
    }
  } else if (cardValue === index-1 || cardValue === 3 && index === 0) {
    return {
      zIndex: "1",   
      opacity: "1", 
      margin:`0px ${margin}px 0px 0px`,
      transform: "rotateY(-45deg) ",  
    }
  } else if (cardValue === index+1 || cardValue === 0 && index === playerCards.length-1) {
    return {
      margin:`0px -${margin}px 0px 0px`, 
      opacity: "1", 
      zIndex: "1",  
      transform: "rotateY(45deg)",
    }
  } 
  else {
    return {
      margin:"0px 0px 0px 0px",
      scale:"0.8", 
      opacity:"1",
      zIndex:"0",
      transform:"rotateY(45deg)",
    }
  }
  
}

const currentPlayer = (value) => {
  switch(value){
    case "Easy": 
      return 1; 
    break; 
    case "Normal":
      return 2; 
    break; 
    case "Hard": 
      return 3; 
    break; 
    default: 
      return 0; 
    break; 
  }

  

}

const playerCards = [

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

]; 

const btnStyle = (btn,width) => {
 
  if (btn === "removeLeft" || btn === "removeRight"){

    return { 
      margin:`0px ${width}px 0px 0px`, 
      transform: "rotateY(-45deg)",  
    }

  } else if (btn === "addLeft" || btn === "addRight"){
   return { 
      margin:`0px -${width}px 0px 0px`,   
      transform: "rotateY(45deg)",
    }
  }
  
}



function PlayerCard ({cardId,handleChange,playerIndex,}) {

  const [cardMargin,setCardMargin] = React.useState(0);
  const cardElement = React.useRef(0);

  React.useEffect(() => {
    if (cardElement.current){
      
      const width = cardElement.current.clientWidth; 
      setCardMargin( width * 1.8);
    }
  });


  return (
    <>
      {
        playerCards.map((card,index) => {

          return (

            <div className="playerCard"  key={`player${index}${cardId}`} style={cardStyle(cardMargin,index,playerIndex)} ref={cardElement} >

              <img className="cardImg" src={card.img} />
              
              

              {card.type === "Player"?
                <input type="text" id={cardId} name={cardId}  spellCheck = "false" autoComplete="off" onChange={handleChange} placeholder="Player Name"  className="playerNameInput"/> 
                : 
                <h2>{card.type}</h2>
              } 
              
            </div> 

          )

        })
      }
    </>
  )

}


function PlayerMenuPhone ({handleClick,handleOnChange,player1Index,player2Index}) {
  const [btnWidth,setBtnWidth] = React.useState(0);
  const [player,setPlayer] = React.useState("player1");
  
  const activeBtn = {
    opacity:1,
  }

  
  
  const btnElement = React.useRef(0);

  const changePlayer = (e) => {
    const btnPressed = e.target.value; 
    setPlayer(btnPressed)
  } 

  React.useEffect(() => {
    if (btnElement.current) {
      const width = btnElement.current.clientWidth; 
      setBtnWidth(width *1.8);
    }
  });

 

  return (
    <>

      <div className="cardContainer">

        <div className="player_type_btn_container">

          <button className="player_type_btn" onClick={changePlayer} value={"player1"} style={player === "player1" ? activeBtn:{}}> Player 1</button>
          <button className="player_type_btn" onClick={changePlayer} value={"player2"} style={player === "player2" ?activeBtn:{}}> Player 2</button>
    
        </div>

        <button className="playerCardBtn" id={`${player}Prev`} value ={player} onClick={handleClick} ref={btnElement} style={btnStyle("removeLeft",btnWidth)} ></button>
        <button className="playerCardBtn" id={`${player}Next`} value={player} onClick={handleClick} style={btnStyle("addLeft",btnWidth)} ></button>

        { player === "player1" ? 

          <PlayerCard cardId = "player1" handleChange = {handleOnChange} playerIndex = {player1Index} />
          :
          <PlayerCard cardId = "player2" handleChange = {handleOnChange} playerIndex = {player2Index} />

        }

      </div>

    </>
  )
}

function PlayerMenuDesktop ({handleClick,handleOnChange,player1Index,player2Index}) {

  const [btnWidth,setBtnWidth] = React.useState(0);

  const btnElement = React.useRef(0);

  React.useEffect(() => {
    if (btnElement.current){
      const width = btnElement.current.clientWidth; 
      setBtnWidth(width *1.8);
    }
  },[]);

  return (
    <>

    <div className="cardContainer" >

      <h2 className="cardHeader"> Player 1 </h2>

      <button className="playerCardBtn" id="removeLeft" value = {"player1"} onClick={handleClick} ref={btnElement} style={btnStyle("removeLeft",btnWidth)} ></button>
      <button className="playerCardBtn" id="addLeft" value={"player1"} onClick={handleClick} style={btnStyle("addLeft",btnWidth)} ></button>

      <PlayerCard cardId = "player1" handleChange = {handleOnChange} playerIndex = {player1Index}  />
          
    </div>

    <div className="cardContainer">

      <h2 className="cardHeader"> Player 2 </h2>

      <button className="playerCardBtn" value={"player2"} id="removeRight" onClick={handleClick} style={btnStyle("removeRight",btnWidth)} ></button>
      <button className="playerCardBtn" value={"player2"} id="addRight" onClick={handleClick} style={btnStyle("addRight",btnWidth)}  ></button>
      
      <PlayerCard cardId = "player2" handleChange = {handleOnChange} playerIndex = {player2Index} />

    </div>  
    
    </>
  )
}

function PlayerMenu ({setPlayer,player1,player2}) {

  const [player1Index, setPlayer1Index] = React.useState(currentPlayer(player1)); 
  const [player2Index,setPlayer2Index] = React.useState(currentPlayer(player2)); 
  const [player1Name,setPlayer1Name] = React.useState(player1); 
  const [player2Name,setPlayer2Name] = React.useState(player2);
  const [windowSize,setWindowSize] = React.useState(window.innerWidth);
  let display = "phone";

  const handleResize = () => setWindowSize(window.innerWidth);

  window.addEventListener("resize",handleResize);

  


  function handleClick (e) { 
    
    const {id,value} = e.target
    let newIndex;  
     

    switch (id) {
      case "player1Next":  
        newIndex = calcIndex("front",player1Index)
        setPlayer1Index(newIndex); 
      break; 
      case "player1Prev": 
        newIndex = calcIndex("back",player1Index)
        setPlayer1Index(newIndex); 
      break; 
      case "player2Next": 
        newIndex = calcIndex("front",player2Index)
        setPlayer2Index(newIndex);
      break; 
      case "player2Prev":
        newIndex = calcIndex("back",player2Index)
        setPlayer2Index(newIndex); 
      break; 
    }

    const currentCard = playerCards[newIndex].type

    if (value === "player1") {

      if (currentCard === "Player") setPlayer(value,player1Name) 
      else setPlayer(value,currentCard);

    } else if (value === "player2") {

      if (currentCard === "Player") setPlayer(value,player2Name) 
      else setPlayer(value,currentCard);

    }
    
    

  }

  function handleOnChange(e){
    
    const {id,value} = e.target; 

    if (id === "player1"){
      setPlayer1Name(value);
      setPlayer(id,value); 
    } else if (id === "player2") {
      setPlayer2Name(value);
      setPlayer(id,value); 
    }  
    
  }

  return (
    <>

      

      <Header type={"playerMenu"}/> 

      <div className = {display === "phone"? "player_menu_container_phone" : "playerMenuContainer"}  >

        
     {/*  <PlayerMenuDesktop handleClick={handleClick} handleOnChange={handleOnChange} player1Index={player1Index} player2Index={player2Index} />  */}

        <PlayerMenuPhone handleClick={handleClick} handleOnChange={handleOnChange} player1Index={player1Index} player2Index={player2Index} />

      </div>
    </>
  )
  
}