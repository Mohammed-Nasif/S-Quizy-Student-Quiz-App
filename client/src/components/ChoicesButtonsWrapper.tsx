// Material UI Components
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// Icons
import { CheckCircle, Dangerous } from '@mui/icons-material';

// Utilities
import { FC } from 'react';

export const ChoicesButtonsWrapper: FC<{
	setSelectedChoice: (selectedChoice: string) => void;
	selectedChoice: string;
	setIsAnswered: (isAnswered: boolean) => void;
	isCorrectChoice: boolean;
	isAnswered: boolean;
	isQuizFinished: boolean;
}> = ({ setSelectedChoice,  selectedChoice, setIsAnswered, isCorrectChoice, isAnswered, isQuizFinished }): JSX.Element => {

	const choicesOptions = ['noun', 'adverb', 'adjective', 'verb'];

	return (
		<Stack spacing={2} direction='row'>
			{/* Map Over Choices Options To Render Buttons With Different Attributes Depends On Choice */}
			{choicesOptions.map((choice, i) => {
				return (
					<Button
						key={i}
						variant='contained'
						size='small'
						disabled={(isAnswered && choice !== selectedChoice) || isQuizFinished}
						color={!isAnswered ? 'primary' : choice !== selectedChoice ? 'primary' : isCorrectChoice ? 'success' : 'error'}
						sx={{
							'&.Mui-disabled': {
								background: '#eaeaea',
								color: '#c0c0c0',
							},
						}}
						endIcon={!isAnswered ? <></> : choice !== selectedChoice ? <></> : isCorrectChoice ? <CheckCircle /> : <Dangerous />}
						onClick={() => {
							// Set The Choice After Click The Button
							setSelectedChoice(choice);
							setIsAnswered(true);
						}}>
						{choice}
					</Button>
				);
			})}
		</Stack>
	);
};
