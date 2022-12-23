import { createContext, FC, useState } from 'react';
import { Answer, ScoreDetailsContextType } from '../@types/interfaces';

export const ScoreDetailsContext = createContext<ScoreDetailsContextType | null>(null);

interface Props {
	children: React.ReactNode;
}

const ScoreDetailsProvider: FC<Props> = ({ children }) => {
	const [answers, setAnswers] = useState<Answer[]>([]);

	const addAnswer = (answer: Answer): void => {
		setAnswers([...answers, answer]);
	};

	return <ScoreDetailsContext.Provider value={{ answers, addAnswer }}>{children}</ScoreDetailsContext.Provider>;
};

export default ScoreDetailsProvider;
