import React, { Fragment, useEffect, useState } from 'react'
import styled from '../CssModule/CssModul.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface IAnswers {
  answer_content:string ; 
  correct:boolean ; 
}

interface IQuestion {
  id:string ; 
  question_content:string ; 
  answers:IAnswers[] ; 
}

interface IInGameProps {
    questions:IQuestion[] ; 
    handlePrevious:()=>void ;
    handleNext:()=>void ; 
    handleSubmit:()=>void ;  
    currentQuestion:number ;  
    onselectedAnswer:(index:any)=>void ; 
    arrAnswer:any[] ; 
}

const InGame = (props:IInGameProps) => {
    const {
      questions , 
      handlePrevious , 
      handleNext , 
      handleSubmit , 
      currentQuestion , 
      onselectedAnswer,
      arrAnswer , 
    } = props ; 

    // const [arrStateColor , setArrStateColor] = useState<any[]>([]) ; 

    const handleSelectedAnswer = (index:number)=>{
      onselectedAnswer(index) ;
    }
    const formatTime = (time:number) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
    <Fragment>
        <div className='buttonIngame'>
            <button onClick={()=>handlePrevious()} 
            className={currentQuestion===0 ? styled.buttonInactive:styled.buttonPrevious}>Previous</button>
            <button onClick={()=>handleNext()} 
            className={currentQuestion===questions.length-1 ? styled.buttonInactive:styled.buttonNext}>Next</button>
            {currentQuestion===questions.length-1 ? (
              <button onClick={()=>handleSubmit()} className={styled.buttonSubmit}>Submit</button>
              ):null 
            }
        </div>
        <div>
          <div className={styled.question}>
            <div className={styled.countdowncircletime}>
            <CountdownCircleTimer
               isPlaying
               duration={90}
               colors={['#4F46E5', '#F7B801', '#A30000', '#A30000']}
               colorsTime={[7, 5, 2, 0]}
               strokeWidth={10}
               size={80}
               
             >
               {({ remainingTime }) => (
                 <div style={{ fontSize: '20px' }}>
                   <div>{formatTime(remainingTime)}</div>
                 </div>
               )}
            </CountdownCircleTimer>
            </div>
            <p className={styled.numberQuestion}>Question <strong>{currentQuestion+1}</strong>/{questions.length}</p>
            <div className={styled.contentQuestion}>
              <p>{questions[currentQuestion].question_content}</p>
            </div>
          </div>
          <div className={styled.contentAnswer}>
            <ul className={`list-unstyled` }>
              {
              questions[currentQuestion].answers.map((answer , index)=>(
                <li className={`form-control mb-3 py-3 fw-bold text-start 
                ${arrAnswer[currentQuestion]===index ? styled.selectAnswer:""}`} 
                key={index} 
                onClick={()=>handleSelectedAnswer(index)}>
                
                  {index+1}) {answer.answer_content}
                </li>
                ))
              }
              </ul>
          </div>
        </div>
    </Fragment>
  )
}

export default InGame 
