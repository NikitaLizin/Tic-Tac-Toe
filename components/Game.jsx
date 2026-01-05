

function getLines () {
  const left = (col,x) =>  (col - x >= 0) ? col - x : null;  
  const right = (col,x,size) => (col + x < size) ? col + x : null;  
  const up = (row,x) => (row-x >= 0) ? row-x : null;    
  const down = (row,x,size) => (row + x < size) ? row + x : null; 
  const l = (row,col,x) => [row , left(col,x)]; 
  const r = (row,col,x,size) => [row , right(col,x,size)]; 
  const u = (row,col,x) => [up(row,x) , col];
  const d = (row,col,x,size) => [down(row,x,size) , col]; 
  const ul = (row,col,x) => [up(row,x) , left(col,x)]; 
  const dr = (row,col,x,size) => [down(row,x,size) , right(col,x,size)];
  const ur = (row,col,x,size) => [up(row,x) , right(col,x,size)]; 
  const dl = (row,col,x,size) => [down(row,x,size) , left(col,x)];

  return [[l,r],[u,d],[ul,dr],[ur,dl]]; 

}

function checkForWin (board,playerPiece,toWin,row,column,currentPlayer){


  const checkHorizontal = (board,playerPiece,toWin,row,column) => {
    
    const winningPieces = [[row,column]]; 
   
    // check right. 
    for (let x = 1; x <= toWin; x++) {
      
      // total amount of columns
      const amountOfColumns = board[0].length;

      // column to check
      const check = column + x; 

      // if the column you checking is bigger then amount of columns break.
      if (check >= amountOfColumns) break; 

      // if the first value infront is not the same piece break. 
      if (playerPiece === board[row][check]) winningPieces.push([row,check]);  
      else break; 
    } 

     

    // check left.
    for (let x = 1; x <= toWin; x++) {
      
      // if you already have 3 points that means u already won and can break. 
      if (winningPieces.length >= toWin) break;

      // column to check
      const check = column - x;

      // if the column you checking is smaller then amount of columns break. 
      if (check < 0) break; 

      // if the first value behind is not the same piece break. 
      if (playerPiece === board[row][check]) winningPieces.push([row,check]);
      else break;  
    }

    if (winningPieces.length >= toWin) return winningPieces; 
    else return null;    
    
  }
  const checkVertical = (board,playerPiece,toWin,row,column) => {
    
    const winningPieces = [[row,column]]; 
   
    // check up. 
    for (let x = 1; x <= toWin; x++) {
      
      // row to check
      const check = row - x; 

      // if the row you checking is less then amount of rows break.
      if (check < 0) break; 

      // if the first value over is not the same piece break. 
      if (playerPiece === board[check][column]) winningPieces.push([check,column]); 
      else break; 
    } 

     

    // check down.
    for (let x = 1; x <= toWin; x++) {
      
      // total amount of rows
      const amountOfRows = board.length;

      // if you already have 3 points that means u already won and can break. 
      if (winningPieces.length >= toWin) break;

      // row to check
      const check = row + x; 
      // if the row you checking is smaller then amount of rows break. 
      if (check >= amountOfRows) break; 

      // if the first value under is not the same piece break. 
      if (playerPiece === board[check][column]) winningPieces.push([check,column]);  
      else break;  
    }

    if (winningPieces.length >= toWin) return winningPieces ;
    else return null; 
  }
  const checkDiagonal = (board,playerPiece,toWin,row,column) => {


    const leftToRigh = (board,playerPiece,toWin,row,column) => {

      const size = board.length; 
      const winningPieces = [[row,column]];  

      // left up
      for (let i = 1; i <= toWin; i++) {
      
        const checkRow = row - i
        const checkColumn = column- i; 

        if (checkRow < 0 || checkColumn < 0) break; 
        if (playerPiece === board[checkRow][checkColumn]) winningPieces.push([checkRow,checkColumn]); 
        else break;  
      } 

      // right down
      for (let i = 1; i <= toWin; i++) {

        if (winningPieces.length >= toWin) break;

        const checkRow = row+i; 
        const checkColumn = column +i; 

        if (checkRow >= size || checkColumn >= size) break; 

        if (playerPiece === board[checkRow][checkColumn]) winningPieces.push([checkRow,checkColumn]);  
        else break; 
      }

      if (winningPieces.length >= toWin) return winningPieces; 
      else return null; 

    }

    const rightToLeft = (board,playerPiece,toWin,row,column) => {

      
      const size = board.length; 
      const winningPieces = [[row,column]];

      // right up 
      for (let i = 1; i <= toWin; i++) {
         
        const checkRow = row-i; 
        const checkColumn = column +i; 

        if (checkRow < 0 || checkColumn >= size) break; 

        if (playerPiece === board[checkRow][checkColumn]) winningPieces.push([checkRow,checkColumn]);  
        else break; 

      }
      
      // left down
      for (let i = 1; i <= toWin; i++) {

        if (winningPieces.length >= toWin) break;

        const checkRow = row+i; 
        const checkColumn = column -i; 

        if (checkRow >= size || checkColumn < 0) break; 

        if (playerPiece === board[checkRow][checkColumn]) winningPieces.push([checkRow,checkColumn]);
        else break; 

      }

      if (winningPieces.length >= toWin) return winningPieces; 
      else return null;  

    }

    let win = leftToRigh(board,playerPiece,toWin,row,column); 
     

    if (win === null) win = rightToLeft(board,playerPiece,toWin,row,column); 
  
    return win;  
    
  }
  const checkForDraw = (board) => {
    let draw = true;   
    const size = board.length; 
    

    for(let row = 0; row < size; row++){

      for(let column = 0; column < size; column++) {
        const check = board[row][column]; 

        if (!check){
          draw = false;
          break; 
        }   
       
      }
      if (draw === false) break; 
      else continue; 

    }

    return draw === true; 
   
  }

 
  
  
  

  

  const horizontalWin = checkHorizontal(board,playerPiece,toWin,row,column); 
  const verticalWin = checkVertical(board,playerPiece,toWin,row,column);  
  const diagonalWin = checkDiagonal(board,playerPiece,toWin,row,column); 
  const draw = checkForDraw(board); 
  
  if (horizontalWin) return {piece:playerPiece,moves:horizontalWin,player:currentPlayer};
  else if (verticalWin) return {piece:playerPiece,moves:verticalWin,player:currentPlayer};
  else if (diagonalWin) return {piece:playerPiece,moves:diagonalWin,player:currentPlayer};

  else if (draw) return `draw`; 
  else return null; 
  
}; 

const gameContainerStyle = () => {
  const windowWidth = window.innerWidth; 
  const windowHeight = window.innerHeight; 

  /* alert(`Height:${windowHeight} \n width:${windowWidth}`) */

  if (windowHeight >= windowWidth) {
    return {
      width:'round(up,70%, 100px )', 
      aspectRatio:"1/1", 
    }
  } else {
    return {
      height:'round(up,70%, 100px )', 
      aspectRatio:"1/1", 
    }
  }

}

function calcMove (board,toWin,piece,oppPiece,row,col) {

  

  const lines = getLines(); 
  const size = board.length; 
  let totalScore = 1;
  
 

  // go threw each line; 
  for (const [dir1,dir2] of lines) {
    
    let emptCells =  0; 
    let myPieces = 0; 
    let streaks = []; 
  
    for(const dir of [dir1,dir2]){
      
      let prevCell = board[row][col];  
      let streak = 0; 

      for (let x = 1; x <= toWin; x++){

        const [r,c] = dir(row,col,x,size);
        if (r === null || c === null) break; 

        const cell = board[r][c]; 

        if (cell === oppPiece) break;  

        if (cell === piece){
          myPieces++; 
          if (cell === prevCell) streak++; 

        } else if (cell === null){
          emptCells++; 

          if (streak > 0) {streaks.push[streak];streak = 0} 
        } 

        prevCell = cell;  
      } 

    }

    
    if (myPieces + emptCells >= toWin) {
      totalScore += Math.pow(2,myPieces); 
      totalScore += emptCells;  
    } else {
      totalScore += emptCells + myPieces; 
    }
    
    
    if (streaks.length > 0) {
      streaks.forEach((val) => {
        totalScore += Math.pow(3,val); 
      });
    }
    
    
  }
  
  return totalScore; 
}; 

function pickRandomMove (moves) {
 
  const randomNr = Math.floor(Math.random()*moves.length);  
  return moves[randomNr] 
}

function checkNear (board,toWin,piece,oppPiece,row,col){

  const lines = getLines(); 
  const size = board.length; 
  let prevScore = 0; 
  let moves = [];   


  for (const [dir1,dir2] of lines) {

    for (const dir of [dir1,dir2]) {
      
      for (let i = 1; i <= toWin; i++) {
        const [r,c] = dir(row,col,i,size); 

        if (r === null || c === null) break; 
        if (board[r][c] !== null) continue; 

        const cellScore = calcMove(board,toWin,piece,oppPiece,r,c) - i * 0.1; // prefer cells close to last move. 

        if (cellScore === prevScore) moves.push([r,c]); 
        else if (cellScore > prevScore) {moves = [[r,c]]; prevScore = cellScore}; 
      } 

    } 
  
  }

  if (moves.length > 1) return pickRandomMove(moves); 
  else if (moves.length === 1) return moves[0]; 
  else return null; 
}

function findMid (board,toWin,piece,oppPiece){

  const size = board.length; 
  const mid = (size % 2 === 0) ? null : Math.floor(size/2);  
  let score = 0; 
  let move = null; 
  
  if (mid != null){
    if (!board[mid][mid]) return [mid,mid];
    else return null; 
  }  
  
  const check = size/2;  
  for (let i = 0; i <= 1; i++) {
    let row = check+i; 
    for (let col = 0; col < size; col++) {
      const points = calcMove(board,toWin,piece,oppPiece,row,col); 
      if (points > score){
        move = [row,col];
        score = points; 
      }  
    }
  }

  return move; 
  
}

function winningMove (board,toWin,myPiece,oppPiece,lastMove) {
  const [row,col] = lastMove; 
  const lines = getLines(); 
  const size = board.length; 
  let move = null; 
  for (const [dir1,dir2] of lines) {
    let pieces = 1; 
    let emptCell = [];  
    for (const dir of [dir1,dir2]) {

      for (let i = 1; i < toWin; i++) {
        const [r,c] = dir(row,col,i,size); 
        if (r === null || c === null) break; 
        const cell = board[r][c]; 
        if (cell === oppPiece) break; 
        if (cell === myPiece) pieces++;
        else if (cell === null && emptCell.length === 0) emptCell.push([r,c]); 
        else break;   
      } 
    }
    if (pieces === toWin-1 && emptCell.length > 0) {move = emptCell[0]; break}
  }

  return move; 

} 

function stopOppWin (board,toWin,oppPiece,myPiece,oppLastMove) {
   
  const [row,col] = oppLastMove; 
  const lines = getLines(); 
  const size = board.length;
  let stopWin = null;  
  let stopFork = null; 
  for (const [dir1,dir2] of lines) {
    let oppPieces = 1; 
    const emptCells = []; 

    for (const dir of [dir1,dir2]) {

      for (let i = 1; i <= toWin; i++){
        const [r,c] = dir(row,col,i,size); 
        if (r === null || c === null) break;
        
        const cell = board[r][c]; 
        if (cell === myPiece) break;
        if (cell === oppPiece) oppPieces++;  
        else if (cell === null) emptCells.push([r,c]);       
      } 
    }

    if (oppPieces === toWin - 1 && emptCells.length > 0) {stopWin = emptCells[0]; break;} 
    else if (oppPieces === toWin - 2 && emptCells.length >= 2 && size != toWin) {stopFork = emptCells[0]; break;}
  }
  
  if (stopWin) return stopWin; 
  else if (stopFork) return stopFork; 
  else return null; 

}

function findEmptCell (board) {
  const size = board.length; 
  let move = null
  
  for(let row = 0; row < size; row++ ) {
    
    const check = board[row]; 
    const emptCell = check.indexOf(null); 

    if (emptCell != -1){move = [row,emptCell]; break;}
  }

  

  return move; 
}


function randomStartingMove (board,toWin){

  const moves = []; 
  const size = board.length;  
  
  while (moves.length <= toWin) {
    const randomRow = Math.floor(Math.random()*size); 
    const randomCol = Math.floor(Math.random()*size);

    if (randomRow >= size || randomRow < 0 || randomCol >= size || randomCol < 0) continue; 

    moves.push([randomRow,randomCol]); 

  }

  return pickRandomMove(moves); 
  
}

function computerMove (board,toWin,piece,oppPiece,oppLastMove,lastMove,difficulty ) {
  let move = null; 

  

  switch(difficulty) {
    case "Easy": {
      if (lastMove === null) move = randomStartingMove(board,toWin); 
      else move = checkNear(board,toWin,piece,oppPiece,lastMove[0],lastMove[1]); 
      break; 
    }
    case "Normal": 
      if (lastMove != null) {
        const oppWin = stopOppWin(board,toWin,oppPiece,piece,oppLastMove); 
        if (!oppWin && lastMove != null) move = checkNear(board,toWin,piece,oppPiece,lastMove[0],lastMove[1]); 
        else move = oppWin; 
      } else {
        const midMove = findMid(board,toWin,piece,oppPiece);
        if (!midMove) move =  randomStartingMove(board,toWin);
        else move = midMove; 
      }
    break; 
    case "Hard": 
      if (lastMove != null) {
        const win = winningMove(board,toWin,piece,oppPiece,lastMove); 

        if (!win) {
          const oppWin = stopOppWin(board,toWin,oppPiece,piece,oppLastMove); 
          if (!oppWin) move = checkNear(board,toWin,piece,oppPiece,lastMove[0],lastMove[1]);
          else move = oppWin; 
        } else move = win; 

      } else {
        const midMove = findMid(board,toWin,piece,oppPiece);
        if (!midMove && oppLastMove != null) move =  checkNear(board,toWin,piece,oppPiece,oppLastMove[0],oppLastMove[1]);
        else if (!midMove && !oppLastMove) move = randomStartingMove(board,toWin);
        else move = midMove; 
      }
    break; 
  }


  /* if (lastMove != null) {
    
    const win = winningMove(board,toWin,piece,oppPiece,lastMove); 
    const oppWin = stopOppWin(board,toWin,oppPiece,piece,oppLastMove);  
    const surounding = checkNear(board,toWin,piece,oppPiece,lastMove[0],lastMove[1]);
    
    if (win) move = win; 
    else if (!win) move = oppWin; 
    else if (!win && !oppWin) move = surounding;  
    
  } else {
    move = findMid(board,toWin,piece,oppPiece); 
  } */

  
  

  if (move === null) move = findEmptCell(board); 

  return move; 
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function computersTurn () {
  console.log("cannot press this its the computers turn!"); 
}

// setup the board at the begining of the game. 
const setupBoard = (boardSize) => {

  const board = []
  for (let column = 0; column < boardSize; column++ ){
    // add row; 
    board.push([]); 
    
    // add column. 
    for (let row = 0; row < boardSize; row++) {
      board[column].push(null); 
    }
  }
  return board; 
}

function checkForNpc (player1,player2) {
  const arr = ["Easy","Normal","Hard"]; 

  if (arr.includes(player1)) return player1;
  else if (arr.includes(player2)) return player2;  
  else return null; 

}


const moveAudio = new Audio("/assets/move.flac");
let lastMoveO = null; 
let lastMoveX = null; 

function Game ({player1,player2,mode,boardSize,exitGame,toWin}) {
 
  const [board,setBoard] = React.useState(setupBoard(boardSize));  
  
  const [currentPlayer,setCurrentPlayer] = React.useState(player1); 

  const [winner,setWinner] = React.useState(null); 
  
  const [prevMove, setPrevMove] = React.useState(null); 

  
   
  const myPiece = (currentPlayer === player1) ? "X" : "O";  
  const oppPiece = myPiece === "X" ? "O": "X"; 
  const oppLastMove = (myPiece === "X") ? lastMoveO : lastMoveX; 
  const myLastMove = (myPiece === "X") ? lastMoveX : lastMoveO; 
  const npc = checkForNpc(player1,player2); 
  const npcTurn = (npc === currentPlayer) ? true:null; 


  async function computerTurn () { 
    const [r,c] = await computerMove(board,toWin,myPiece,oppPiece,oppLastMove,myLastMove,currentPlayer); 
    handleGame(r,c); 
  }

  function handlePlayAgain (btnPressed) {
    switch(btnPressed) {

      case "yes":
        setBoard(setupBoard(boardSize));
        setWinner(null); 
        setCurrentPlayer(player1); 
      break; 

      case "no": 
        exitGame(); 
      break; 
    }
  }; 

  function handleGame (rowValue,columnValue) {

    rowValue = Number(rowValue); 
    columnValue = Number(columnValue); 

    if (board[rowValue][columnValue] === "X" || board[rowValue][columnValue] === "O"){
      console.log("cant make a move here");
    }   
    
    else {

      const newBoard = board.map((row,rowIndex) => {
          if (rowIndex != rowValue) return row; 
          else {
          const newColumn =  row.map((column,columnIndex) => {
              if (columnIndex != columnValue) return column; 
              else return myPiece; 
            }); 
            return newColumn; 
          }
      }); 
      
      let win = checkForWin(newBoard,myPiece,toWin,rowValue,columnValue,currentPlayer);

      if (win) {
        lastMoveO = null; 
        lastMoveX = null; 
        setWinner(win); 
     
      } else {

        const nextPlayer = (player1 === currentPlayer)? player2: player1; 
        setCurrentPlayer(nextPlayer);
        (myPiece === "O")? lastMoveO = [rowValue,columnValue] : lastMoveX = [rowValue,columnValue];   
      
      }

      moveAudio.play();
     setBoard(newBoard); 
     setPrevMove([rowValue,columnValue]); 

    }
  }; 

  return (
    
    <>
     { npc === null && <PlayerHeader player1 = {player1} player2 = {player2} currentPlayer = {currentPlayer} /> } 
      {winner && <PlayAgain handlePlayAgain = {handlePlayAgain} />} 
       
      {npc != null && <NpcHeader currentPlayer = {currentPlayer} difficulty = {npc} computerTurn = {computerTurn} win = {winner} />}


      <div className="gameContainer" style = {gameContainerStyle()}>

        <Board 
          boardSize = {boardSize} 
          board = {board} 
          mode = {!winner?mode:"win"} 
          handleGame = {!npcTurn && handleGame} 
          prevMove = {prevMove != null ? prevMove : null}
          win = {winner}
        />
         
      </div>
    </>

  );

}; 