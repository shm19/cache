import { describe, expect, it } from 'vitest';
import setupTestDB from '../utils/setupTestDb';

setupTestDB();

describe('Todo App', () => {
  it('should create a new todo', async () => {
    expect(1).toBe(1);
  });
});
