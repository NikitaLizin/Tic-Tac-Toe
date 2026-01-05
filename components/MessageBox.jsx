

const message =  (error) => {
  switch(error){
    case "no mode": 
      return "Oops! Looks like you forgot to pick a mode"
    break; 
    case "doubble npc": 
      return "Player 1 and Player 2 cannot both be NPCs. Please choose at least one human player."
    break;  
  }
}

function MessageBox({error,closeError}) {

  const handleClick = () => {
    closeError(); 
  }

  return (
    <div className="messageBox">
      <span onClick={handleClick} className="material-icons-outlined">close</span>
      <p> {message(error)} </p>
    </div>
  )
}