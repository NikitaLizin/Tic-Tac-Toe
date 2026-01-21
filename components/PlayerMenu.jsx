



const cardStyle = (margin,cardValue,index,cardAmount) => {
  
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
  } else if (cardValue === index+1 || cardValue === 0 && index === cardAmount-1) {
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



function PlayerCard ({cardId,handleChange,playerCards,playerIndex}) {

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

            <div className="playerCard"  key={`player${index}${cardId}`} style={cardStyle(cardMargin,index,playerIndex,playerCards.length)} ref={cardElement} >

              <img className="cardImg" src={card.img} />
              
              

              {card.type === "Player"?
                <input type="text" id={cardId} name={cardId} value={card.name} spellCheck = "false" autoComplete="off" onChange={handleChange} placeholder={card.name}  className="playerNameInput"/> 
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


function PlayerMenuPhone ({handleClick,playerCards,handleOnChange,player1Index,player2Index}) {
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

          <PlayerCard cardId = "player1" playerCards={playerCards[0]} handleChange = {handleOnChange} playerIndex = {player1Index} />
          :
          <PlayerCard cardId = "player2" playerCards={playerCards[1]} handleChange = {handleOnChange} playerIndex = {player2Index} />

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

function PlayerMenu ({changePlayerIndex,changePlayerName,player1Index,player2Index,playerCards}) {

  const [windowSize,setWindowSize] = React.useState(window.innerWidth);
  let display = "phone";

  const handleResize = () => setWindowSize(window.innerWidth);

  window.addEventListener("resize",handleResize);

  


  const handleClick = (e) => { 
    
    const btnPressed = e.target.id; 
     
    changePlayerIndex(btnPressed); 

  }

  function handleOnChange(e){
    
    const {id,value} = e.target; 
    
    changePlayerName(id,value); 
    
    
  }

  return (
    <>

      

      <Header type={"playerMenu"}/> 

      <div className = {display === "phone"? "player_menu_container_phone" : "playerMenuContainer"}  >

        
     {/*  <PlayerMenuDesktop handleClick={handleClick} handleOnChange={handleOnChange} player1Index={player1Index} player2Index={player2Index} />  */}

        <PlayerMenuPhone handleClick={handleClick} playerCards ={playerCards} handleOnChange={handleOnChange} player1Index={player1Index} player2Index={player2Index} />

      </div>
    </>
  )
  
}