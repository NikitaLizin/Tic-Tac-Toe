
const showClicked = (card,mode) => {
  if (mode === card) return{scale:"1.1 ",boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"};
  else return {scale:"1"}; 
}

function ModeMenu ({changeMode,currentMode}) {

  const [mode,setMode] = React.useState(currentMode); 
  

  function handleClick (e) {
    const btnPressed = e.target.value; 

    setMode(btnPressed);
    changeMode(btnPressed);  
  }   

  return (
    
    <>
      <Header type="modeMenu"/>
      <div className="modeMenuContainer">
        
        <div className="modeCard" style={showClicked("Classic",mode)}>
          <h2> Classic </h2>
          <p> 
             Play classic Tic-Tac-Toe. 
          </p>
          <button className="modeBtn" value={"Classic"} onClick={handleClick} > Select </button>
        </div>

       <div className="modeScreen">
          {mode && <img className="modeImg" src={`./assets/${mode}.gif`}/>}
        </div> 

        <div className="modeCard" style={showClicked("Memory",mode)} >
            <h2> Memory </h2>
            <p> 
              Play a regular game of Tic-Tac-Toe — with a twist! You'll need to remember where you placed your piece.
            </p>
            <button className="modeBtn" value={"Memory"} onClick={handleClick}> Select </button>
        </div>
      </div>
    </>
  )
}