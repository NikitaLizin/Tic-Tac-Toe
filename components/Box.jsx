

const getContent = (piece,mode,prevMove,win) => {
  if (mode === "Classic"|| mode === "win") {
    switch(piece){
      case "X": 
        if (win) return <img className="winning-piece" src="\assets\X.svg"/>
        else if (prevMove != null && !win) return <img className="prevMove" src="\assets\X.svg"/>
        else return <img className="piece" src="\assets\X.svg"/>

      break; 
      case "O": 
        if (win) return <img className="winning-piece" src= "\assets\O.svg"/>
        else if (prevMove != null && !win ) return <img className="prevMove" src= "\assets\O.svg"/>
        else  return <img className="piece" src= "\assets\O.svg"/>
      break; 
    }
  } 
  else if (mode === "Memory"){
    if (piece === "X" || piece ==="O"){
      if (win) return <div className="winning-piece" style ={{width:"80%",height:"80%",background:"#239BA7",borderRadius:"8px"}}> </div>;
      else if (prevMove != null && !win) return <div className="prevMove" style ={{width:"80%",height:"80%",background:"#239BA7",borderRadius:"8px"}}> </div>;
      else return <div style ={{width:"80%",height:"80%",background:"#239BA7",borderRadius:"8px"}}> </div>;  
    }
  } 
  
  else return null; 
}

function Box ({piece,value,handleGame,mode,prevMove,win}) {


  function handleClick (e) {

    if (mode === "win" || piece !== null) {
      console.log("win cant press"); 
    } else {
      let button = e.target; 
      let columnValue = button.value; 
      let rowValue = button.parentElement.getAttribute("value");  
      if (handleGame) handleGame(rowValue,columnValue);
    }
  
  }

   

  return (

    

    <button className="box" value={value}  onClick={handleClick}>
      {getContent(piece,mode,prevMove,win)}       
    </button>
  )
}