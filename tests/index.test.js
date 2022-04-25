import app from '../src/app.js';
import request from 'supertest';

describe('GET /tasks', () => {

	test('should respond with a 200 status code', async () => {
		const response = await request(app).get('/tasks').send();
		expect(response.statusCode).toBe(200);
	});

	test('should respond with an array', async () => {
		const response = await request(app).get('/tasks').send();
		expect(response.body).toBeInstanceOf(Array);
	});
});

describe('POST /tasks', () => {
	describe('Given a title and description', () => {

		const newTask = {
			title: 'Test Task',
			description: 'Test Description'
		}

		test('should respond with a 200 status code', async () => {
			const response = await request(app).post('/tasks').send(newTask);
			expect(response.statusCode).toBe(200);
		});

		test('should have a content-type: application/json in header', async () => {
			const response = await request(app).post('/tasks').send(newTask);
			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
		});

		test('should respond with a task ID', async () => {
			const response = await request(app).post('/tasks').send(newTask);
			expect(response.body.id).toBeDefined();
		});
	});

	describe('When title and description are missing', () => {

		test('should respond with a 400 status code', async () => {
			const response = await request(app).post('/tasks').send({});
			expect(response.statusCode).toBe(400);
		});
	});
})