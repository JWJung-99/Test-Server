/**
 * @openapi
 * tags:
 * - name: Notes
 *   description: 메모 관련 기능
 * components:
 *   schemas:
 *     ResponseSuccessModel:
 *       type: object
 *       properties:
 *         ok:
 *           type: number
 *           example: 1
 *           description: 성공
 *     ResponseErrorModel:
 *       type: object
 *       properties:
 *         ok:
 *           type: number
 *           example: 0
 *           description: 실패
 *     NoteResponseModel:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           example: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
 *           description: 메모 id
 *         title:
 *           type: string
 *           example: Note 1
 *           description: 메모 제목
 *         contents:
 *           type: string
 *           example: Contents 1
 *           description: 메모 내용
 *         created:
 *           type: Date
 *           example: 2025-07-01T10:45:22.000Z
 *           description: 메모 생성 일시
 *         updated:
 *           type: Date
 *           example: 2025-07-04T10:45:22.000Z
 *           description: 메모 생성 일시
 *     NewNoteRequestModel:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: New Note
 *           description: 새로운 메모
 *         contents:
 *           type: string
 *           example: New Contents
 *           description: 새로운 내용
 *     UpdatedNoteRequestModel:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Updated Note
 *           description: 수정된 메모
 *         contents:
 *           type: string
 *           example: Updated Contents
 *           description: 수정된 내용
 *
 * @openapi
 * /notes:
 *   get:
 *     summary: 메모 목록 조회
 *     description: 메모 목록을 조회합니다.
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: 조회 결과
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseSuccessModel'
 *                 - type: object
 *                   properties:
 *                     item:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/NoteResponseModel'
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Internal Server Error
 *
 * @openapi
 * /notes/{uuid}:
 *   get:
 *     summary: 메모 상세 조회
 *     description: 메모 상세 정보를 조회합니다.
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         type: string
 *     responses:
 *       200:
 *         description: 조회 결과
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseSuccessModel'
 *                 - type: object
 *                   properties:
 *                     item:
 *                       $ref: '#/components/schemas/NoteResponseModel'
 *       400:
 *         description: path 값 에러
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: id 형식이 올바르지 않습니다.
 *       404:
 *         description: 데이터 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: 해당 메모를 찾을 수 없습니다.
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Internal Server Error
 *
 * @openapi
 * /notes:
 *   post:
 *     summary: 메모 작성
 *     description: 메모를 작성합니다.
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewNoteRequestModel'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseSuccessModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: 메모가 추가되었습니다.
 *       400:
 *         description: 필수 데이터 미입력
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: 필수 데이터를 입력하세요.
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Internal Server Error
 *
 * @openapi
 * /notes/{uuid}:
 *   put:
 *     summary: 메모 수정
 *     description: 메모 상세 정보를 조회합니다.
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatedNoteRequestModel'
 *     responses:
 *       200:
 *         description: 메모 수정 결과
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseSuccessModel'
 *                 - type: object
 *                   properties:
 *                     item:
 *                       $ref: '#/components/schemas/NoteResponseModel'
 *       400:
 *         description: Client 요청 에러
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - allOf:
 *                   - $ref: '#/components/schemas/ResponseErrorModel'
 *                   - type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: id 형식이 올바르지 않습니다.
 *                 - allOf:
 *                   - $ref: '#/components/schemas/ResponseErrorModel'
 *                   - type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: 필수 데이터를 입력하세요.
 *       404:
 *         description: 데이터 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: 해당 메모를 찾을 수 없습니다.
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Internal Server Error
 *
 * @openapi
 * /notes/{uuid}:
 *   delete:
 *     summary: 메모 삭제
 *     description: 메모를 삭제합니다.
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         type: string
 *     responses:
 *       200:
 *         description: 삭제 완료
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseSuccessModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: 메모가 삭제되었습니다.
 *       400:
 *         description: path 값 에러
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: id 형식이 올바르지 않습니다.
 *       404:
 *         description: 데이터 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: 해당 메모를 찾을 수 없습니다.
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ResponseErrorModel'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Internal Server Error
 */
