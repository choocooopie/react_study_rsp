import { useState } from 'react';
import './App.css';
import Box from "./component/Box"

// 1. 박스 2개 (타이틀, 사진, 결과)
// 2. 가위, 바위, 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3, 4번의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패 결과에 따라 테두리 색이 바뀐다. (이기면 - 초록, 지면 - 빨강, 비기면 - 검정색)

const choice = {
  rock:{
    name:"Rock",
    img:"https://i.ytimg.com/vi/GVT3WUa-48Y/maxresdefault.jpg"
  },
  scissors:{
    name:"Scissors",
    img:"https://i.ytimg.com/vi/tWZOEFvczzA/maxresdefault.jpg"
  },
  paper:{
    name:"Paper",
    img:"https://media.techtribune.net/uploads/2023/03/0ebce5cb-29b2-4677-a6f4-c0c241119790-videoscreenshot-youtube-animerockpaperscissors-205.jpg",
  },
};

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [userResult, setUserResult] = useState("");
  const [computerResult, setComputerResult] = useState("");

  const play = (userChoice) => {
    let computerChoice = randomChoice();

    setUserSelect(choice[userChoice]);
    setComputerSelect(computerChoice);

    let result = judgement(choice[userChoice], computerChoice);
    setUserResult(result);
    setComputerResult(getComputerResult(result));
  }

  const judgement=(user, computer)=>{

    if(user.name === computer.name) {
      return "tie"
    } else if (user.name === "Rock") 
      return computer.name === "Scissors" ? "win" : "lose"
    else if (user.name === "Scissors") 
      return computer.name === "Paper" ? "win" : "lose"
    else if (user.name === "Paper") return computer.name === "Rock" ? "win" : "lose";
  };

  const getComputerResult=(userResult)=>{
    if (userResult === "win") return "lose";
    if (userResult === "lose") return "win";
    return "tie";
  }

  const randomChoice=()=>{
    let itemArray = Object.keys(choice); // 객체에 키값만 뽑아서 Array로 만들어 주는 함수다.
    let randomItem = Math.floor(Math.random() * itemArray.length); 
    let final = itemArray[randomItem];
    return choice[final];
  }

  return (
    <div>
      <div className='main'>
        <Box title="You" item={userSelect} result={userResult}/>
        <Box title="Computer" item={computerSelect} result={computerResult}/>
      </div>
      <div className='main'>
        <button onClick={() => play("scissors")}>
          <img src="https://www.seekpng.com/png/detail/111-1114370_rock-paper-scissors-rock-paper-scissors-clipart.png" alt="scissors" style={{ width: "50px", height: "50px" }}></img>
        </button>
        <button onClick={() => play("rock")}>
          <img src="https://www.seekpng.com/png/detail/816-8161371_rock-paper-scissor-icon-png.png" alt="rock" style={{ width: "50px", height: "50px" }}></img>
        </button>
        <button onClick={() => play("paper")}>
          <img src="https://image.pngaaa.com/772/3313772-middle.png" alt="paper" style={{ width: "50px", height: "50px" }}></img>
        </button>
      </div>

      <h2 className="result">{userResult}</h2>
    </div>
  );
}

export default App;