
const setupBoard = (boardSize) => {

  const board = []
  for (let column = 0; column < boardSize; column++ ){
    // add row; 
    board.push([]); 
    
    // add column. 
    for(let row = 0; row < boardSize; row++) {
      board[column].push(null); 
    }
  }
  return board; 
}


function BoardSettings ({changeBoardSize,boardSize}) {

  const [size,setSize] = React.useState(boardSize); 
  const [board,setBoard] = React.useState(setupBoard(size));
  const [message,setMessage] = React.useState(null); 

  function handleClick(e){
    const btnPressed = e.target.id;
    
    
    switch(btnPressed){
      case "add":

        if (size === 10) setMessage("You can't go bigger than 10x10!"); 
        
        else {
           
          const newSize = size+1; 
          const newBoard = setupBoard(newSize); 
          
          if (message) setMessage(null);
          
          changeBoardSize(newSize);
          setSize(newSize); 
          setBoard(newBoard); 
        
        }

      break; 
      
      case "remove": 

        if (size === 3) setMessage("You can't go smaller than 3x3!"); 
        
        else {
           
          const newSize = size-1; 
          const newBoard = setupBoard(newSize); 
          
          if (message) setMessage(null);
          
          changeBoardSize(newSize); 
          setSize(newSize); 
          setBoard(newBoard); 

        }

      break; 
    
    }
  }


  return (
    <>
      <Header type="boardMenu" /> 
      <div className="boardMenu">
        
        <div className="boardSize"> 
          <h2> {size} X {size} </h2>
        </div>
        
        <div className="boardDisplay">
          <Board board = {board} boardSize = {size} mode = {"Classic"} />
        </div>

        <div className="boardBtnContainer">
          <span className="material-icons-outlined boardBtn" onClick={handleClick} id="add"> add</span>
          <span className="material-icons-outlined boardBtn" onClick={handleClick} id="remove"> remove </span>
        </div>
      
      </div>
    </>
  )
}