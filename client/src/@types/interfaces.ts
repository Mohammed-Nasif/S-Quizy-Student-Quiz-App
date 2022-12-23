export interface Word {
	id: number;
	word: string;
	pos: string;
}

export interface Answer {
	questionWord: string;
	studentAnswer: string;
	isCorrectChoice: boolean;
}

export type ScoreDetailsContextType = {
	answers: Answer[];
	addAnswer: (Answer: Answer) => void;
};
