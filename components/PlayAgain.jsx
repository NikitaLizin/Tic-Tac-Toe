
function PlayAgain ({handlePlayAgain}) {

  /* const color = (piece === "X")? {backgroundColor:} */
  
  function handleClick(e) {
    const pressedBtn = e.target.value; 
    handlePlayAgain(pressedBtn);     
  }

  return (

    <div className="playAgainContainer">
      <h3> Play Again? </h3>
      <div className="playAgainBtnContainer">
        <button className="playAgainBtn" value={"yes"} onClick={handleClick}> Yes!</button>
        <button className="playAgainBtn"value={"no"} onClick={handleClick}> No!</button>  
      </div>
    </div>
  )
}