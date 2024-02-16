import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TodosService {
  //* Get all todos
  async getTodos(): Promise<object[]> {
    return await prisma.todo.findMany();
  }

  async getSpecificTodo(id: string): Promise<object | string> {
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) return 'No todo found';

    return todo;
  }

  //* Create a todo
  async createTodo(title: string, description: string): Promise<string> {
    console.log('creating-----------------------', title, description);

    const todoCreated = await prisma.todo.create({
      data: {
        title,
        description,
      },
    });

    if (todoCreated) return 'Todo created successfully';
  }

  //* Update a todo
  async updateTodo(
    id: string,
    title: string,
    description: string,
  ): Promise<object | string> {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) return 'Todo not found';

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title, description },
    });

    if (!updatedTodo) return 'Error while updating your todo';

    return updatedTodo;
  }

  //* Delete a todo
  async deleteTodo(id: string): Promise<string> {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) return 'Todo not found';

    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });

    if (!deletedTodo) return 'Error while deleting your todo';

    return 'Todo deleted successfully';
  }
}
