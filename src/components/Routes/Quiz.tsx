import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import '../../App.css';
import './Quiz.scss';
import MarsQuiz from '../../assets/mars_quiz.json';
import QnA from '../QnA/QnA';
/*
export type Question = {
    Question: string,
    Options: string[],
    answer: string,
    explanation: string
}
*/
const Quiz: React.FunctionComponent = () => {
   /*
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        
        setQuestions(MarsQuiz.map((q) => ({
            Question: q.question,
            Options: q.options,
            answer: q.answer,
            explanation: q.explanation,
        })));

    }, []);
    */
    return (
        <div>
            <p id="QuizBgImage"></p>
            <p className='QuizTitle'>🚀 Mission: Mars – How Much Do You Know?</p>
            <p className='QuizSubtitle'>Test your cosmic knowledge with a fun Mars facts quiz!</p>
            <QnA /* Questions={questions} *//>
        </div>
    );
}

export default Quiz;