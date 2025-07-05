import { useEffect, useState } from 'react';
import '../../App.css';
import './QnA.scss'

const NoOfQuestions: number = 10;
const PassingMark: number = 7;

type Question = {
    Question: string,
    Options: string[],
    Answer: string,
    Explanation: string
}

interface QuestionProps {
   Questions : Question[];
};

const QnA: React.FC<QuestionProps> = (props: QuestionProps) => {
    const firstQuestion = Math.floor(Math.random() * NoOfQuestions);
    const [QuestionNo, setQuestionNo] = useState<number[]>([firstQuestion]);
    const [currentQuestion, setCurrentQuestion] = useState(firstQuestion);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [count, setCount] = useState(1);

    const handleSubmitButtonClick: () => void = () => {
        if (selectedAnswer?.trim() === props.Questions[currentQuestion].Answer){
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

    const handleTryAgainButtonClick: () => void = () => {
        const firstQuestion = Math.floor(Math.random() * NoOfQuestions);
        setQuestionNo([firstQuestion]);
        setCurrentQuestion(firstQuestion);
        setCount(1);
        setSelectedAnswer(null);
        setScore(0);
        setMessage("");
        setIsVisible(false);
        setIsCompleted(false);
        setIsCorrect(false);
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
                <p>{count}. {props.Questions[currentQuestion].Question}</p>
                <br/>
                <div className='answer'>
                {props.Questions[currentQuestion].Options.map((answerOption: string, optionIndex: number) => (
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
                {isVisible && !isCorrect && <p>Correct Answer is: {props.Questions[currentQuestion].Answer} </p>}
                {isVisible && <p>Explanation : {props.Questions[currentQuestion].Explanation}</p>}
                <br/>
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
            <br/>
            <button onClick={handleTryAgainButtonClick} className="submit-button">
            Try Again
            </button>
        </div>
    );
}
}

export default QnA;