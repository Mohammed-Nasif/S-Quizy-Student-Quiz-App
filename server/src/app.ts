const express = require('express');
import { PORT, WORDS_NUMBERS, WORDS_ENDPOINT, RANK_ENDPOINT } from './constants';
const app = express();

const { getWordsArray, getStudentRank } = require('./TestData_model');

// Cors for cross origin allowance
const cors = require('cors');

//Enable Cors Requests
app.use(cors());

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Run Server On LocalHost Port 8080
app.listen(PORT, () => console.log(`\u001b[1;32mServer Running On \u001b[1;34mhttp://localhost:${PORT}/`));

app.get('/', (_req: any, res: { send: (arg0: string) => void }) => {
	res.send(`<div style="display:flex; flex-direction:column; align-items:center; position: absolute; top: 10%; left: 50%; transform: translateX(-50%); background-color: #DDD; width:60%;padding: 10px; border: 2px solid black;"><h1>Welcome To S-Quizy Endpoints Home Page</h1>
			<h4>You can use this API To Test The S-Quizy App by using the following Endpoints : </br> </br> <a href="http://localhost:8080/words">/words</a></h4>
			</div>`);
});

// Words EndPoint
app.get(WORDS_ENDPOINT, (_req: any, res: { send: (arg0: any) => void }) => {
	res.send(getWordsArray(WORDS_NUMBERS)); // You Can Change 10 To Any Required Number Of Words [It's 10 By Defalut In Model Function]
});

// Rank EndPoint
app.post(RANK_ENDPOINT, (req: { body: { score: any } }, res: { send: (arg0: any) => void }) => {
	const studentScore = req.body.score;
	res.send(getStudentRank(studentScore));
});
