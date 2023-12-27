import { useEffect, useState } from 'react'
import './App.css'
import StartGame from './components/StartGame'
import InGame from './components/InGame'
import EndGame from './components/EndGame'
import questionsData from './questions.json' ; 
import Review from './components/Review'
function App() {
  const [gameStatus, setGameStatus] = useState<"startgame"|"ingame"|"endgame"|"review">("startgame") ; 
  const [questions , setQuestions] = useState<any[]>([])
  const [currentQuestion , setcurrentQuestion] = useState<number>(0) ; 

  const [arrayAnswer , setArrayAnswer] = useState<any[]>([]) ; 
  const [selectAnswer , setSelectAnswer] = useState(null) ; 

  
  useEffect(()=>{

    setQuestions(questionsData) ; 
 },[])

  const onselectedAnswer = (index:any)=>{
    setSelectAnswer(index) ; 
  }
  // console.log(selectAnswer);
  useEffect(()=>{
    const newArrayAnswer = [...arrayAnswer] ; 
    newArrayAnswer[currentQuestion] = selectAnswer ; 
    setArrayAnswer(newArrayAnswer) ;
  } , [selectAnswer , currentQuestion])


  const handleEndgame = ()=>{
    setTimeout(()=>{
      setGameStatus('endgame') ; 
    },90*1000) ; 
  }
  

  const handleStartGame = ()=>{
    setGameStatus("ingame") ; 
    handleEndgame() ; 
  }

  console.log(arrayAnswer);

  const handlePrevious = (currQuestion:number)=>{
    if(currentQuestion>0){
      setSelectAnswer(arrayAnswer[currQuestion-1]) ; 
      setcurrentQuestion(currQuestion-1) ; 
      
    }
  }

  const handleNext = (currQuestion:number)=>{
    if(currQuestion<questions.length-1){
      if(arrayAnswer[currQuestion+1]!=null){
        setSelectAnswer(arrayAnswer[currQuestion+1]) ; 
      }else{
        setSelectAnswer(null) ; 
      }
      setcurrentQuestion(currQuestion+1) ; 
    }

  } ; 

 
  const handleSubmit = ()=>{
    console.log("submit");
    const popup =  confirm("Do you want to submit answers ? ") ; 
    if(popup){
      setGameStatus("endgame") ; 
    }
  }

  const handleScore = ()=>{
    var total = 0 ; 
    questions.forEach((item , index)=>{
      if(item!=undefined && arrayAnswer[index]!=null){
        if(item.answers[arrayAnswer[index]].correct===true){
          total++ ; 
        }
      }
    })

    return total ; 
  }

  console.log(handleScore());

  const handleRestart = () => {
    window.location.reload();
  };

  const handleReview = ()=>{
    setGameStatus('review') ; 
    // setcurrentQuestion(0) ; 
  }
  const renderGame = ()=>{
    switch (gameStatus) {
      case "startgame":
         return <StartGame handleStartGame={handleStartGame}></StartGame>
        break;
      case "ingame":
         return <InGame 
         questions={questions}
         handlePrevious={()=>handlePrevious(currentQuestion)} 
         handleNext={()=>handleNext(currentQuestion)} 
         handleSubmit={handleSubmit}
         currentQuestion={currentQuestion}
         onselectedAnswer={onselectedAnswer}
         arrAnswer={arrayAnswer}>
         </InGame>
        break;
      case "endgame":
        return <EndGame 
        result={handleScore}
        handleReview={handleReview}></EndGame>
        break;
      case "review":
        return <Review questions={questions}
        handlePrevious={()=>handlePrevious(currentQuestion)}
        handleNext={()=>handleNext(currentQuestion)}
        handleRestart={handleRestart}
        currentQuestion={currentQuestion}
        arrAnswer={arrayAnswer}>

        </Review>
        break;
    
      default:
        break;
    }
  }

  return (
    <>
      {renderGame()}
    </>
  )
}

export default App
