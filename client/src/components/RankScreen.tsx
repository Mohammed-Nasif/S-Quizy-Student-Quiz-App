// Import All From React
import * as React from 'react';
import clsx from 'clsx';

// MUI Utils
import { styled, Box, Theme } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

// Material UI Components
import { Button as ModalButton } from '@mui/material';

// Components
import ScoreDetailsTable from './ScoreDetailsTable';

// Icons
import RefreshIcon from '@mui/icons-material/Refresh';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const BackdropUnstyled = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
	const { open, className, ...other } = props;
	return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

const Modal = styled(ModalUnstyled)`
	position: fixed;
	z-index: 1300;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
	z-index: -1;
	position: fixed;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	-webkit-tap-highlight-color: transparent;
`;

const style = (theme: Theme) => ({
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 450,
	backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
	border: '2px solid currentColor',
	padding: '16px 32px 24px 32px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-around',
	alignItems: 'center',
});

function ScoreModal({ score }: any): JSX.Element {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<ModalButton variant='outlined' size='small' color='secondary' endIcon={<AssessmentIcon />} onClick={handleOpen} sx={{ mr: 3 }}>
				Show Score Details
			</ModalButton>

			<Modal hideBackdrop open={open} onClose={handleClose} aria-labelledby='child-modal-title' aria-describedby='child-modal-description'>
				<Box sx={[style, { width: '500px' }]}>
					<h2 id='child-modal-title' style={{ marginBottom: '0px' }}>
						Score Details
					</h2>
					<p id='child-modal-description'>
						You Scored <span style={{ color: 'blue' }}>{score}</span> Points.
					</p>
					<ScoreDetailsTable /> {/*Table To Show Answers History To User */}
					<ModalButton variant='contained' size='small' color='info' onClick={handleClose} sx={{ mt: 2 }} endIcon={<HighlightOffIcon />}>
						Close Score Details
					</ModalButton>
				</Box>
			</Modal>
		</>
	);
}

// Rank Screen After Quiz Finished
export default function RankModal({
	isQuizFinished,
	handleRestartQuiz,
	rank,
	score,
}: {
	isQuizFinished: boolean;
	handleRestartQuiz: () => void;
	rank: number;
	score: number;
}): JSX.Element {
	return (
		<div>
			<Modal open={isQuizFinished} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description' slots={{ backdrop: Backdrop }}>
				<Box sx={style}>
					<h3 id='parent-modal-title' style={{ textAlign: 'center' }}>
						Congratulations you have finished the quiz ✨
					</h3>
					<p id='parent-modal-description' style={{ textAlign: 'center', marginBottom: '30px' }}>
						You ranked Above <span style={{ fontWeight: 'bold' }}>{rank} % </span>of other students.
					</p>
					<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
						<ScoreModal score={score} /> {/* Score Screen */}
						<ModalButton variant='outlined' size='small' color='primary' endIcon={<RefreshIcon />} onClick={handleRestartQuiz}>
							Restart Quiz
						</ModalButton>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
