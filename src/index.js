import express from 'express';
import {
	addNote,
	deleteNote,
	getNote,
	getNotes,
	updateNote,
} from './db/database.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello! This is Test Server');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// GET notes
app.get('/notes', async (req, res) => {
	const notes = await getNotes();

	if (notes.length === 0) res.send([]);

	res.send(notes);
});

// GET note
app.get('/note/:uuid', async (req, res, next) => {
	try {
		const uuid = req.params.uuid;

		if (!uuid) {
			const error = new Error('id를 입력하세요.');
			error.status = 400;
			throw error;
		}

		if (uuid.length !== 36) {
			const error = new Error('id 형식이 올바르지 않습니다.');
			error.status = 400;
			throw error;
		}

		const note = await getNote(uuid);

		if (note.length === 0) res.send({});

		res.send(note[0]);
	} catch (err) {
		next(err);
	}
});

app.post('/note', async (req, res, next) => {
	try {
		const { title, contents } = req.body;

		if (!title || !contents) {
			const error = new Error('필수 데이터를 입력하세요.');
			error.status = 400;
			throw error;
		}

		await addNote(title, contents);
		res.sendStatus(201);
	} catch (err) {
		next(err);
	}
});

app.put('/note/:uuid', async (req, res, next) => {
	try {
		const uuid = req.params.uuid;
		const { title, contents } = req.body;

		if (!uuid) {
			const error = new Error('id를 입력하세요.');
			error.status = 400;
			throw error;
		}

		if (uuid.length !== 36) {
			const error = new Error('id 형식이 올바르지 않습니다.');
			error.status = 400;
			throw error;
		}

		if (!title || !contents) {
			const error = new Error('필수 데이터를 입력하세요.');
			error.status = 400;
			throw error;
		}

		await updateNote(uuid, title, contents);

		const updatedNote = await getNote(uuid);

		res.send(updatedNote);
	} catch (err) {
		next(err);
	}
});

app.delete('/note/:uuid', async (req, res, next) => {
	try {
		const uuid = req.params.uuid;

		if (!uuid) {
			const error = new Error('id를 입력하세요.');
			error.status = 400;
			throw error;
		}

		if (uuid.length !== 36) {
			const error = new Error('id 형식이 올바르지 않습니다.');
			error.status = 400;
			throw error;
		}

		await deleteNote(uuid);

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

// Error Handling
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).send(message);
});
