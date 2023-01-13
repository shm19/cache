import { beforeEach, describe, expect, it } from 'vitest';
import setupTestDB from '../utils/setupTestDb';
import supertest from 'supertest';
import app from '../../src';
import { Todo } from '../../src/models/todoModel';

const baseUrl = '/todos';
setupTestDB();

describe('Todo App', () => {
  describe('POST /todos', () => {
    let todo: Todo;

    beforeEach(() => {
      todo = {
        title: 'Test Todo',
        description: 'Test Description',
      };
    });

    it('should create a new todo', async () => {
      const res = await supertest(app).post(baseUrl).send(todo).expect(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('todo');
      expect(res.body.data.todo).toMatchObject({
        title: 'Test Todo',
        description: 'Test Description',
      });
    });

    it('should return 400 if title is not provided', async () => {
      todo.title = '';
      const res = await supertest(app).post(baseUrl).send(todo);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errorType');
      expect(res.body.errorType).toMatch(/JOI_VALIDATION/);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toMatch(/title/);
    });

    it('should return 400 if description is not provided', async () => {
      todo.description = '';
      const res = await supertest(app).post(baseUrl).send(todo);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errorType');
      expect(res.body.errorType).toMatch(/JOI_VALIDATION/);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toMatch(/description/);
    });
  });
});
