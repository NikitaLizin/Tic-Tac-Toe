const player1Style = {
  color:"#239BA7",
}

const player2Style = {
  color:"#7ADAA5",
}

const activePlayer = {
  opacity:"1", 
}

const waitingPlayer = {
  opacity:"0.5",
} 


function PlayerHeader ({player1,player2,currentPlayer}) {
  
  console.log(player1);
  
  return (
    <div className="player-header">

      <div className="player-vs-card" style = {(player1 === currentPlayer) ? activePlayer:waitingPlayer}   > 
        <h3 style = {player1Style} > {player1} </h3>
        <img src="/assets/X.svg" className="player-card-piece"/>
      </div>
      <div className="vs-container">
        <h3> vs </h3>
      </div>
      <div className="player-vs-card" style = {(player2 === currentPlayer)? activePlayer:waitingPlayer} >
        <h3 style={player2Style}> {player2} </h3>
        <img src="/assets/O.svg" className="player-card-piece"/>
      </div>
      
      
    </div>
  )
}