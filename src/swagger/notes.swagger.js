/**
 * @openapi
 * tags:
 *   name: notes
 *   description: 메모 API
 *
 * @openapi
 * /notes:
 *   get:
 *     summary: 메모 전체 가져오기
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: 조회 결과
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   uuid:
 *                     type: string
 *                     example: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
 *                     description: 메모 id
 *                   title:
 *                     type: string
 *                     example: Note 1
 *                     description: 메모 제목
 *                   contents:
 *                     type: string
 *                     example: Contents 1
 *                     description: 메모 내용
 *                   created:
 *                     type: Date
 *                     example: 2025-07-04T10:45:22.000Z
 *                     description: 메모 생성 일시
 */
