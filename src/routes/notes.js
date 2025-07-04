import express from 'express';
import {
	addNote,
	deleteNote,
	getNote,
	getNotes,
	updateNote,
} from '../db/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const notes = await getNotes();

	if (notes.length === 0)
		res.send({
			ok: 1,
			item: [],
		});

	res.send({ ok: 1, item: notes });
});

// GET note
router.get('/:uuid', async (req, res, next) => {
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

		if (!note || note.length === 0) {
			const error = new Error('해당 메모를 찾을 수 없습니다.');
			error.status = 404;
			throw error;
		}

		res.send({
			ok: 1,
			item: note[0],
		});
	} catch (err) {
		next(err);
	}
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

		res.status(201).send({
			ok: 1,
			message: '메모가 추가되었습니다.',
		});
	} catch (err) {
		next(err);
	}
});

// PUT note
router.put('/:uuid', async (req, res, next) => {
	try {
		const uuid = req.params.uuid;
		let { title, contents } = req.body;

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

		if (!title && !contents) {
			const error = new Error('수정할 제목이나 내용을 입력하세요.');
			error.status = 400;
			throw error;
		}

		const previousNote = await getNote(uuid);

		if (!previousNote || previousNote.length === 0) {
			const error = new Error('해당 메모를 찾을 수 없습니다.');
			error.status = 404;
			throw error;
		}

		if (!title) {
			title = previousNote[0].title;
		}

		if (!contents) {
			contents = previousNote[0].contents;
		}

		await updateNote(uuid, title, contents);

		const updatedNote = await getNote(uuid);

		res.status(200).send({
			ok: 1,
			item: updatedNote[0],
		});
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

		const note = await getNote(uuid);

		if (!note || note.length === 0) {
			const error = new Error('해당 메모를 찾을 수 없습니다.');
			error.status = 404;
			throw error;
		}

		await deleteNote(uuid);

		res.status(204).send({
			ok: 1,
			message: '메모가 삭제되었습니다.',
		});
	} catch (err) {
		next(err);
	}
});

export default router;
