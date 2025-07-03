export const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: '테스트 서버',
			version: '1.0.0',
			description: 'Notes 정보를 관리하는 RESTful API 서버',
		},
		servers: [
			{
				url: 'https://api.jinwook.site',
				description: '배포 서버',
			},
		],
	},
	apis: ['./src/swagger/*.swagger.js'],
};
