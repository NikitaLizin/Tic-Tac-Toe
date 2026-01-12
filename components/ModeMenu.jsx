
const showClicked = (card,mode) => {
  if (mode === card) return{scale:"1.05 ",/* boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" */};
  else return {scale:"1"}; 
}

function getDevice (windowSize) {
  if (windowSize > 600) return "desktop"; 
  else if (windowSize < 600) return "phone";  
}

function PhoneModeMenu({changeMode,currentMode}){
  const [mode,setMode] = React.useState(currentMode); 
  const modeIndex = getModeIndex(currentMode);  

  const unActiveBtn = {opacity:"0.6"}; 


  function getModeIndex (currentMode) {
    if (currentMode === "Classic") return 1; 
    else if (currentMode === "Memory") return 2; 
    else return 0; 
  }
  
  const modes = [

    {
      type:"No mode", 
      content:"Select a game mode to begin.", 
    },

    {
      type: "Classic",
      content: "Play classic Tic-Tac-Toe.",
      gif: "./assets/Classic.gif"
    },
    {
      typ: "Memory", 
      content: "Play a regular game of Tic-Tac-Toe — with a twist! You'll need to remember where you placed your piece.",
      gif: "./assets/Memory.gif", 
    }
  ]
  
  
  function handleClick (e) {
    const btnPressed = e.target.value; 

    setMode(btnPressed);
    changeMode(btnPressed);  
  }   

  return (
    
    <>
      <Header type="modeMenu"/>
      <div className="mode_menu_container_phone">

        <div className="mode_btn_container">
          <button className="mode_btn_phone" value={"Classic"} style={mode != "Classic" ? unActiveBtn:{}} onClick={handleClick}>Classic</button>
          <button className="mode_btn_phone" value={"Memory"} style = {mode != "Memory" ? unActiveBtn:{}} onClick={handleClick}>Memory</button>
        </div>

        { mode != null && 
          <div className="mode_display_phone">

          
            <img className="mode_img_phone" src={`${modes[modeIndex].gif}`} />
          
          
          </div>
        }

        <div className="text_container_phone">
          <p> 
            {modes[modeIndex].content}
          </p>
        </div>
        
       
      </div>
    </>
  )
}

function DisplayModeMenu({changeMode,currentMode}){
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



function ModeMenu ({changeMode,currentMode}) {

  const [mode,setMode] = React.useState(currentMode); 
  const [windowSize, setWindowSize] = React.useState(getDevice(window.innerWidth));  
  
  window.addEventListener("resize",() => {
    if (window.innerWidth > 600 && windowSize != "desktop") setWindowSize("desktop");
    else if (window.innerWidth < 600 && windowSize != "phone") setWindowSize("phone"); 
  }); 

  React.useEffect(() => {
    console.log(windowSize);  
  },[windowSize])
  

  function handleClick (e) {
    const btnPressed = e.target.value; 

    setMode(btnPressed);
    changeMode(btnPressed);  
  }   

  return (
    
    <>

      {
        windowSize === "desktop"? 
        <DisplayModeMenu changeMode={changeMode} currentMode={currentMode}/> : 
        <PhoneModeMenu changeMode={changeMode} currentMode={currentMode}/>  
      }
       

    </>
  )  
}