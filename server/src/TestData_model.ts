const { readFileSync } = require('fs');

// Helper Function To Get Random Index From Array According To It's Length
const getRandomIndex = (arrayLength: number) => Math.floor(Math.random() * arrayLength);

// Function To Handle Randomize Of Words Data
const getWordsArray = (reqArrayLen: number = 10) => {
	// Get WordsList From TestData JSON FILE
	const allWords = JSON.parse(readFileSync('./db/TestData.json'))['wordList'];

	// Categorize The Words According To Part Speech
	const adverbs = allWords.filter((word: any) => word.pos === 'adverb');
	const adjectives = allWords.filter((word: any) => word.pos === 'adjective');
	const nouns = allWords.filter((word: any) => word.pos === 'noun');
	const verbs = allWords.filter((word: any) => word.pos === 'verb');

	// Select Four Random Word From Each Catergory
	const mustIncluded = [
		adverbs[getRandomIndex(adverbs.length)],
		adjectives[getRandomIndex(adjectives.length)],
		nouns[getRandomIndex(nouns.length)],
		verbs[getRandomIndex(verbs.length)],
	];

	// The Set To Be Used Inside Remaining Word Loop As .has in O(1) Not O(N) as .includes in Array
	const alreadyIncludedWords = new Set();
	mustIncluded.forEach((w) => alreadyIncludedWords.add(w.word));

	const remainingWords = [];

	// Loop Over The WordsList To Get Another Random Words To Complete All 10 Words Needed In Our Case
	for (let i = 0; remainingWords.length < reqArrayLen - 4; i++) {
		
		// Cause Of This set.has() method The Whole Loop Now Is O(N) Time.Complexity
		if (!alreadyIncludedWords.has(allWords[i].word)) {
			remainingWords.push(allWords[i]);
		}
	}

	/*
		• Cause Of The Small Amount Of Data, Shuffle Again On The Array Is A Good Option 
		To Ensure The Randomization Of Words In Every Request
	*/
	const shuffledWords = [...remainingWords, ...mustIncluded].sort(() => 0.5 - Math.random());

	const response = JSON.stringify(shuffledWords);

	return JSON.parse(response);
};

// Function To Handle The Rank Calculation Of Student
const getStudentRank = (score: number) => {
	// Get All Scores From TestData JSON FILE
	const allScores = JSON.parse(readFileSync('./db/TestData.json'))['scoresList'];

	const totalScores = allScores.length;
	let belowStudentScore = 0; // Number Of Scores Below The Current Student Score

	allScores.forEach((s: number) => {
		if (s < score) belowStudentScore++;
	});

	const rank = (belowStudentScore / totalScores) * 100;
	return rank.toFixed(2);
};

module.exports = { getWordsArray, getStudentRank };
export {};
