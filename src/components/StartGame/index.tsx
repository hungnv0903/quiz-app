import React from 'react'
import styled from '../CssModule/CssModul.module.css' ;

interface IStartGameProps {
    handleStartGame:()=>void ; 
}
const StartGame = ({handleStartGame}:IStartGameProps) => {
    
    return (
    <div className={styled.container}>
        <h1>Welcome to React Quiz Game! </h1>
        <button className={styled.button} onClick={()=>handleStartGame()}>Start</button>
    </div>
  )
}

export default StartGame