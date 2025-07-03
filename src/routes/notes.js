import express from 'express';
import {
	addNote,
	deleteNote,
	getNote,
	getNotes,
	updateNote,
} from '../db/database.js';

const router = express.Router();

// GET notes
router.get('/', async (req, res) => {
	const notes = await getNotes();

	if (notes.length === 0) res.send([]);

	res.send(notes);
});

// POST note
router.post('/', async (req, res, next) => {
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

// PUT note
router.put('/:uuid', async (req, res, next) => {
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

// DELETE note
router.delete('/:uuid', async (req, res, next) => {
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

export default router;
