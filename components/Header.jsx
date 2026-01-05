
function choseContent (type) {
  
  switch(type) {

    case "playerMenu": 
      return "Pick your players!"; 
    break; 

    case "Difficulty": 
      return "Pick your Difficulty!"; 
    break;
    case "boardMenu": 
      return "Pick your board size!"; 
    break;
    case "modeMenu": 
      return "Pick a Game Mode!"; 
    break;
  }

}


function Header ({type}) {
 
  return (
    <div className = "header"> 

      
      
      <h1> {choseContent(type)} </h1>

      
      
    </div>
  ); 

}; 
 