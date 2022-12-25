// Packages
import axios from 'axios';

// Hooks
import { useContext, useEffect, useState } from 'react';

// Components
import { QuestionCard } from '../components/QuestionCard';
import RankModal from './../components/RankScreen';

// Contexts
import { ScoreDetailsContext } from './../context/ScoreDetailsContext';

// Types
import { ScoreDetailsContextType, Word } from './../@types/interfaces';


// Assets [Images]
import Logo from '../assets/images/logo.png';

// CSS
import './Home.css';

const Home = (): JSX.Element => {
	
	// Declartions Of App States
	const [quizWords, setQuizWords] = useState<Word[]>();
	const [selectedChoice, setSelectedChoice] = useState<string>('NA');
	const [isCorrectChoice, setIsCorrectChoice] = useState<boolean>(false);
	const [currentQuestion, setCurrentQuestion] = useState<Word>({ id: 0, word: '', pos: '' });
	const [questionsCounter, setQuestionCounter] = useState<number>(10);
	const [score, setScore] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);
	const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
	const [isAnswered, setIsAnswered] = useState<boolean>(false);
	const [rank, setRank] = useState<number>(0);
	
	const { addAnswer } = useContext(ScoreDetailsContext) as ScoreDetailsContextType;

	// Fetching The Api with words EndPoint To get The WordsList on Component Mount
	useEffect(() => {
		const fetchWordsList = async () => {
			try {
				const { data } = await axios.get('http://localhost:8080/words');
				setQuizWords(data);
			} catch (error) {
				throw new Error();
			}
		};
		return () => {
			fetchWordsList();
		};
	}, []);

	// Change The Current Question According To The Total Numbers Of Questions
	useEffect(() => {
		// QuestionCounter - 1 => casue Total Number Of Questions is 10 but the array 0 index
		if (quizWords) setCurrentQuestion(quizWords[questionsCounter - 1]);
	}, [quizWords, questionsCounter]);

	// Set The State Of Selected Answer (True Or False) according to user Choice
	useEffect(() => {
		if (currentQuestion?.pos === selectedChoice) setIsCorrectChoice(true);
	}, [selectedChoice, currentQuestion]);

	// Set The New Score With The Correct Answer
	useEffect(() => {
		if (isCorrectChoice) setScore((prev) => prev + 10);
	}, [isCorrectChoice]);

	// Post Request With Student Score After The Quiz Completed To Get The Rank
	useEffect(() => {
		const getStudentRank = async () => {
			try {
				const { data: rank } = await axios.post('http://localhost:8080/rank', { score: score });
				setRank(rank);
			} catch (error) {
				throw new Error();
			}
		};

		if (progress === 100) {
			getStudentRank();
		}
	}, [progress, score]);

	// Function To Handle The Data For The Next Upcoming Question
	const handleNextQuestion = (): void => {

		// Add The Current Answer To The ScoreDetailsContext To Be Used As Answers History
		addAnswer({ questionWord: currentQuestion.word, studentAnswer: selectedChoice, isCorrectChoice: isCorrectChoice });

		// Change The Index Of Question To Select The New Question
		setQuestionCounter((prev) => prev - 1);

		// Reset All The Previous States
		setIsCorrectChoice(false);
		setSelectedChoice('NA');
		setIsAnswered(false);

		// Set The New Question And The Progress According To The Condition
		if (quizWords && questionsCounter > 0) {
			setCurrentQuestion(quizWords[questionsCounter - 1]);
			setProgress(((quizWords.length - questionsCounter + 1) / quizWords.length) * 100);
		}

		// If The Current Question Is The Last One ,, The Quiz Set As Finished
		if (questionsCounter === 1) setIsQuizFinished(true);
	};

	// Function To Restart The Quiz After Finish [Works On Try Again Button]
	const handleRestartQuiz = (): void => {
		window.location.reload();
	};

	return (
		<div className='Home'>
			<header className='Home-header'>
				<div className='App-logo'>
					<img src={Logo} alt='app-logo' />
				</div>
				{/* Practice Screen */}
				<QuestionCard
					progress={progress}
					setSelectedChoice={setSelectedChoice}
					handleNextQuestion={handleNextQuestion}
					isCorrectChoice={isCorrectChoice}
					currentQuestion={currentQuestion}
					questionsCounter={questionsCounter}
					selectedChoice={selectedChoice}
					isAnswered={isAnswered}
					setIsAnswered={setIsAnswered}
					isQuizFinished={isQuizFinished}
				/>
				{/* Rank Screen */}
				<RankModal isQuizFinished={isQuizFinished} handleRestartQuiz={handleRestartQuiz} rank={rank} score={score} />
			</header>
		</div>
	);
};

export default Home;
