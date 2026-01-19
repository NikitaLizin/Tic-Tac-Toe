
function Board ({boardSize,board,mode,handleGame,prevMove,win}) {


  const boardStyle = {
    display:"grid", 
    gridTemplateRows:`repeat(${boardSize},1fr)`, 
    gridTemplateColumns: "100%",   
  }

  const rowStyle = {
    display:"grid", 
    gridTemplateColumns:`repeat(${boardSize},1fr)`,
    gridTemplateRows: "100%" , 
  }

  const getPrevMove = (rowIndex,columnIndex) => {
    if (!prevMove) return null; 
    else {
      const [r,c] = prevMove; 

      if (r === rowIndex && c === columnIndex) return true; 
      else return null; 

    }
  } 

  const getWinMove = (rowIndex,colIndex) => {
    if (!win || win === "draw") return null; 
    else {
      const moves = win.moves; 
      let winningMove = null; 


      for (const [r,c] of moves) {
        if (r === rowIndex && c === colIndex) {winningMove = true; break}
      }

      return winningMove;

    }

  }   

  return(
    <div className="board" style = {boardStyle} >
        {
          board.map((row,rowIndex) => {

            return <div style = {rowStyle} value = {rowIndex} className="row" key={rowIndex}>  
            
              {
                row.map((column,columnIndex) => {
                  return (
                    <Box 
                      key={`${columnIndex},${rowIndex}`} 
                      content = {column} 
                      value = {columnIndex} 
                      mode = {mode} 
                      handleGame = {handleGame} 
                      piece = {column}
                      prevMove = {getPrevMove(rowIndex,columnIndex)}
                      win = {getWinMove(rowIndex,columnIndex)}
                    />
                  )
                })  
              }
            
            </div>
          }) 
        }
    </div>
  )
   

}