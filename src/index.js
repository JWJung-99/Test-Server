import cors from 'cors';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import notesRouter from './routes/notes.js';
import { swaggerOptions } from './swagger/config.js';

const app = express();
const port = 3000;

// const corsOptions = {
// 	origin: 'https://www.domain.com',
// 	credentials: true,
// };

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cors(corsOptions));

// Swagger 설정
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
	res.send('안녕하세요? 테스트 서버입니다.');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// Notes API 라우팅
app.use('/notes', notesRouter);

// Error Handling
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).send({ ok: 0, message });
});
