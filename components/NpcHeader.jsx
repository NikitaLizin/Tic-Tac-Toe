
const randomPick =  (size) => Math.floor(Math.random()*size); 

function textForNpc(difficulty) {
  
  let text; 
  

  switch(difficulty) {
    case "Easy":
      text = [
        "Don’t rush me, I panic easily…",
        "Oh no… brain’s buffering again…",
        "Thinking… and kinda stressing…",
        "Confidence level: 12%",
        "This seemed easier in my head…"
      ]
    break;  
    case "Normal": 
      text = [
        "Watch and learn… hopefully",
        "Let’s see if luck’s on my side",
        "Okay, I think I’ve got the winning move.",
        "You’re not the only one who can play smart.",
        "Confidence level: medium-high!"
      ]
    break;
    case "Hard": 
      text = [
        "Try to keep up",
        "You sure you’re ready for this?",
        "I don’t make guesses — only moves.",
        "Confidence level: maxed out.",
        "Watch and learn.",
      ]
    break;  
      
  }

  

  return text[randomPick(text.length)]; 

}

function npcWinText (npc) {
  let text; 
  switch(npc) { 

    case "Easy":
      text = [
        "Wait… I actually won?!", 
        "Oh wow, that worked!", 
        "I knew it… kinda.",
      ];  
    break;
    case "Normal":
      text = [
        "Nice try! But I’m on a roll. A very wobbly roll.",
        "Boom! Skill. Pure skill. Don’t question it.",
        "Victory! I’d like to thank my fans… all zero of them.",
      ];
      case "Hard":
        text = [
          "And THAT is why I’m the final boss.",
          "This win goes right into my highlight reel.",
          "Victory. As expected. Obviously."
        ];
      break; 
    break;  
  }

  return text[randomPick(text.length)]; 
}

function npcDrawText (npc) {
  let text; 
  switch(npc) {
    case "Easy":
      text = [
        "Nobody lost? Nice, I love that rule.", 
        "Hey, that’s basically a win for me!",
        "Phew… at least I didn’t embarrass myself"
      ];  
    break; 
    case "Normal":
      text = [
        "A draw? My confidence refuses to accept that.",
        "A tie? Cool. I’ll still count it as half a win.",
        "Guess we’re evenly matched. Didn’t expect that from me!"
      ]
    break; 
    case "Hard":
      text = [
        "We tied? Unacceptable. Rematch. Now.",
        "Okay, okay… you held your ground. Impressive. Annoying, but impressive.",
        "A draw? Seriously? I don’t do ties."
      ];
    break; 
  }

  return text[randomPick(text.length)]; 
}

function npcLoseText (npc) {
  let text; 
  switch (npc) {
    case "Easy":
      text = [
        "Brain.exe has officially crashed.",
        "Guess I’m not built for pressure.",
        "Heh… at least I tried, right?",
      ];  
    break; 
    case "Normal":
      text = [
        "I lost?! Must’ve been lag.", 
        "Okay, okay… warm-up round. Doesn’t count.",
        "You win this time! Keyword: this time"
      ]
    break;
    case "Hard":
      text = [
        "Ugh. Losing feels illegal.",
        "Okay… okay… breathe. I’ll destroy you next round.",
        "No. Nope. Not accepting that. Run it back.",
      ];
    break;  
  }

  return text[randomPick(text.length)]; 
}

function textForPlayer (difficulty) {
  let text;  

  switch (difficulty) {
    case "Easy": 
      text = [
        "Your move — I’m ready… I think.", 
        "Your turn — I’ll just, uh… watch nervously",
        "Go ahead! I need a second to think anyway", 
        "Your turn! I already made enough bad decisions today.",
        "Alright, your turn — I’ll just be over here panicking.",
      ]; 
    break;
    case "Normal":
      text = [
        "Alright, your move! Just don’t make me look too good.",
        "Your move! Don’t worry, I’ll try not to judge.",
        "Your turn! Time to see if you’ve been paying attention.",
        "Your turn! No pressure… for me, anyway.",
        "Okay, your move! Don’t worry, losing builds character"
      ]
    break;  
    case "Hard":
      text = [
        "Alright, show me what you’ve got. Try not to disappoint.",
        "Okay, your turn. Shock me. I dare you.",
        "Your move. I’ll pretend to be worried.",
        "Go ahead. I need to see how you plan on losing.",
        "Your turn. Don’t think too hard, it won’t help",
      ]
    break; 
  }

  return text[randomPick(text.length)]; 
}

function checkWin (val,difficulty) {
  const arr = ["Easy","Normal","Hard"]; 
  if (arr.includes(val)) return npcWinText(val);
  else if (val != "draw") return npcLoseText(difficulty);
  else if (val === "draw") return npcDrawText(difficulty);  
  else return null; 
}

function checkCurrentPlayer (currentPlayer) {
  const arr = ["Easy","Normal","Hard"]; 

  if (arr.includes(currentPlayer)) return true; 
  else return null;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function NpcTextBox ({difficulty,handleAnimationEnd}) {
  return (
    <div className="npc-text-box" onAnimationEnd={handleAnimationEnd}>
      <p> {textForNpc(difficulty)} </p>
    </div>
  )
}

function PlayerTextBox ({difficulty}) {
  return (
    <div className="npc-text-box">
      <p> {textForPlayer(difficulty)} </p>
    </div>
  )
}

function GameOverTextBox ({win,difficulty}) {
  return (
    <div className="npc-text-box">
      <p> {checkWin(win,difficulty)} </p>
    </div>
  )
}

function pickImg (difficulty) {
  switch(difficulty){
    case "Easy":
      return "./assets/EasyNpc.png";
    break; 
    case "Normal":
      return "./assets/NormalNpc.png"; 
    break; 
    case "Hard": 
      return "./assets/HardNpc.png";
    break; 
  }
}



function NpcHeader ({currentPlayer,difficulty,computerTurn,win}) {  
  
  async function handleAnimationEnd () {
    await delay(500); 
    computerTurn();
  }

  const  createTextBox =  () => {
    const npcTurn = checkCurrentPlayer(currentPlayer); 
    if (npcTurn && !win) return <NpcTextBox difficulty={difficulty} handleAnimationEnd={handleAnimationEnd} /> 
    else if (!npcTurn && !win) return <PlayerTextBox difficulty={difficulty} />
    else return <GameOverTextBox win = {win != "draw" ? win.player:"draw"}  difficulty={difficulty} /> 
  }

  

  return(
    
    <div className="npc-container">

      <img className="npcAvatar" src={pickImg(difficulty)}/>
      <div className="textContainer">
        
        {createTextBox()}
        
      </div>
        
      
    </div>

   
  )
}