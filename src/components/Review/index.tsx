import React, { Fragment } from 'react'
import styled from '../CssModule/CssModul.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface IAnswers {
    answer_content: string;
    correct: boolean;
}

interface IQuestion {
    id: string;
    question_content: string;
    answers: IAnswers[];
}

interface IInGameProps {
    questions: IQuestion[];
    handlePrevious: () => void;
    handleNext: () => void;
    handleRestart: () => void;
    currentQuestion: number;
    arrAnswer: any[];
}

const Review = (props: IInGameProps) => {
    const {
        questions,
        handlePrevious,
        handleNext,
        handleRestart,
        currentQuestion,
        arrAnswer,
    } = props;

    return (
        <Fragment>
            <div className='buttonIngame'>
                <button onClick={() => handleNext()}
                    className={questions.length-1-currentQuestion === 0 ? styled.buttonInactive : styled.buttonPrevious }>
                    Previous
                </button>
                <button onClick={() => handlePrevious()}
                    className={questions.length-1-currentQuestion === questions.length - 1 ? styled.buttonInactive : styled.buttonNext }>
                    Next
                </button>
                <button onClick={() => handleRestart()} className={styled.buttonSubmit}>Restart</button>
            </div>
            <div>
                <div className={styled.question}>
                <div className={styled.countdowncircletime}>
                    <CountdownCircleTimer
                    isPlaying
                    duration={0}
                    colors={['#4F46E5', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    strokeWidth={0}
                    size={80}
                    
                    >
                    {({ remainingTime }) => (
                        <div style={{ fontSize: '16px' }}>
                        <div style={{ color:'red' , fontWeight:'bold' }}>End!</div>
                        </div>
                    )}
                    </CountdownCircleTimer>
                </div>
                    <p className={styled.numberQuestion}>Question <strong>{questions.length-1-currentQuestion + 1}</strong>/{questions.length}</p>
                    <div className={styled.contentQuestion}>
                        <p>{questions[questions.length-1-currentQuestion].question_content}</p>
                    </div>
                </div>
                <div className={styled.contentAnswerReview}>
                    <ul className={`list-unstyled`}>
                        {
                            questions[questions.length-1-currentQuestion].answers.map((answer, index) => (
                                <li className={`form-control mb-3 py-3 fw-bold text-start 
                                    ${arrAnswer[questions.length-1-currentQuestion] === index ? styled.icorrectAnswer : ""} 
                                    ${answer.correct===true ? styled.correctAnswer:""}`}
                                    key={index}>
                                    {index + 1}) {answer.answer_content}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default Review