import React from 'react'
import styled from '../CssModule/CssModul.module.css'

interface IEndGameProps{
  result:()=>number ; 
  handleReview:()=>void ; 
}
const EndGame = ({result , handleReview}:IEndGameProps) => {
  const handleReload = () => {
    window.location.reload();
  };
 
  return (
    <div>
        <h1 className={styled.h1}>Your score is : <strong>{result()}</strong></h1>
        <div>
          <button className={styled.buttonNext} onClick={handleReload}>Try again</button>
          <button className={styled.buttonReview} onClick={()=>handleReview()}>Review</button>
        </div>
        <div>
        
        </div>
    </div>
    
  )
}

export default EndGame