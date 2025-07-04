import React from 'react';
import '../../App.css';
import './Quiz.scss';
import QnA from '../QnA/QnA';

const Quiz: React.FunctionComponent = () => {
    return (
        <div>
            <p id="QuizBgImage"></p>
            <p className='QuizTitle'>🚀 Mission: Mars – How Much Do You Know?</p>
            <p className='QuizSubtitle'>Test your cosmic knowledge with a fun Mars facts quiz!</p>
            <QnA />
        </div>
    );
}

export default Quiz;