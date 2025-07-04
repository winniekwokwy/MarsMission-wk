import { useEffect, useState } from 'react';
import '../../App.css';
import MarsQuiz from '../../assets/mars_quiz.json';
import './QnA.scss'

const NoOfQuestions: number = 10;
const PassingMark: number = 7;

function QnA () {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Track the selected answer
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [count, setCount] = useState(1);
    const [QuestionNo, setQuestionNo] = useState<number[]>([0]);

    const handleSubmitButtonClick: () => void = () => {
        if (selectedAnswer?.trim() === MarsQuiz[currentQuestion].answer){
            setScore(score+1);
            setMessage("Your answer is correct!");
            setIsCorrect(true);
        }
        else{
            setMessage("Your answer is wrong!");
        }
        setIsVisible(true);
    };

    const handleNextButtonClick: () => void = () => {
        let nextQuestion = 0;

        if (count===NoOfQuestions) {
            setIsCompleted(true);
            if (score>=PassingMark){
                setMessage("You're a genius! Congratulations!");
            }
            else {
                setMessage("Please try again later.");
            }
        }
        else {
            do {
                nextQuestion = Math.floor(Math.random() * NoOfQuestions);
            } while (QuestionNo.indexOf(nextQuestion)!=-1);
            QuestionNo.push(nextQuestion);
            setQuestionNo(QuestionNo);
        }
        setCurrentQuestion(nextQuestion);
        resetStatus();
        setCount(count+1);
    };

    function resetRadio() {
        var radio = null;
        for (var i = 0; i < 4; i++) {
            radio = document.getElementById(`answerOption-${i}`);
            (radio as HTMLInputElement).checked = false;
        }
    }

    function resetStatus(){
        setIsVisible(false);
        setSelectedAnswer(null);
        setIsCorrect(false);
        resetRadio();
    }

    useEffect(() => {
        
    }, []);
    if (!isCompleted) {
    return (
        <div>
            <div className="Question">
                <p>{count}. {MarsQuiz[currentQuestion].question}</p>
                <br/>
                <div className='answer'>
                {MarsQuiz[currentQuestion].options.map((answerOption: string, optionIndex: number) => (
                    <li list-style-type="none" key={`li-${optionIndex}`}>
                    <label key={`label-${optionIndex}`}>
                    <input type="radio" name={`question-${currentQuestion}`} id={`answerOption-${optionIndex}`} onChange={() => setSelectedAnswer(answerOption)} />
                        {answerOption}
                    </label>
                    </li>
                ))}
                </div>
                <br/>
            </div>
            <button onClick={handleSubmitButtonClick} className="submit-button">
            Submit
            </button>
            <div className='CorrectAnswer'>
                <br/>
                {isVisible && <p>{message} </p>}
                {isVisible && !isCorrect && <p>Correct Answer is: {MarsQuiz[currentQuestion].answer} </p>}
                {isVisible && <p>Explanation : {MarsQuiz[currentQuestion].explanation}</p>}
                {isVisible && <button onClick={handleNextButtonClick} className="next-button">
                    Next
                </button>}
            </div>
        </div>
    );
}
else {
    return (
        <div className="FinalResult">
            <br/>
            <h3>Your result is {score}/{NoOfQuestions}! {message}</h3>
            <br/>
            <h3>Thank you for your participation!</h3>
        </div>
    );
}
}

export default QnA;