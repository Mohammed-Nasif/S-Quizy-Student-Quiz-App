// Material UI Components
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Components
import { ProgressBar } from './ProgressBar';
import { ChoicesButtonsWrapper } from './ChoicesButtonsWrapper';

// MUI Utilits
import { capitalize } from '@mui/material/utils';

// Icons
import { NavigateNext } from '@mui/icons-material';

// Utilities
import { FC } from 'react';

// Types
import { Word } from './../@types/interfaces';

export const QuestionCard: FC<{
	currentQuestion: Word;
	questionsCounter: number;
	progress: number;
	setSelectedChoice: (selectedChoice: string) => void;
	handleNextQuestion: () => void;
	isCorrectChoice: boolean;
	selectedChoice: string;
	setIsAnswered: (isAnswered: boolean) => void;
	isAnswered: boolean;
	isQuizFinished: boolean;
}> = ({
	currentQuestion,
	questionsCounter,
	progress,
	setSelectedChoice,
	handleNextQuestion,
	isCorrectChoice,
	selectedChoice,
	setIsAnswered,
	isAnswered,
	isQuizFinished,
}): JSX.Element => {

	return (
		<Card sx={{ minWidth: 450, px: 1 }}>
			<CardContent>

				<ProgressBar progress={progress} sx={{ mb: 1.5 }} /> {/*Question Progress Bar*/}

				<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
					Parts of Speech Quiz
				</Typography>
				<Typography variant='h5' component='div'>
					{<p>{questionsCounter > 0 ? capitalize(currentQuestion?.word) : 'End of Questions'}</p>}
				</Typography>
				<Typography variant='body2' sx={{ mb: 1 }}>
					Choose the part of speech that the above word belongs
					<br />
				</Typography>

				<CardActions sx={{ display: 'flex', justifyContent: 'center', mx: 1.5 }}>
					{/* Next Question Button */}
					<Button size='small' sx={{ fontSize: 12 }} endIcon={<NavigateNext />} onClick={handleNextQuestion} disabled={!isAnswered}>
						Next Question
					</Button>
				</CardActions>

				<CardActions sx={{display: "flex", justifyContent: "center"}}>
					{/*Choices Buttons */}
					<ChoicesButtonsWrapper
						setSelectedChoice={setSelectedChoice}
						isCorrectChoice={isCorrectChoice}
						selectedChoice={selectedChoice}
						setIsAnswered={setIsAnswered}
						isAnswered={isAnswered}
						isQuizFinished={isQuizFinished}
					/>
				</CardActions>
			</CardContent>
		</Card>
	);
};
