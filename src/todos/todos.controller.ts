import {
  Body,
  Controller,
  Post,
  Param,
  Delete,
  Put,
  Get,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOperation({ summary: 'Get All todos' })
  async getTodos(): Promise<object[]> {
    return await this.todosService.getTodos();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a specific todo' })
  @ApiParam({ name: 'id', type: String })
  async getSpecificTodo(@Param('id') id: string): Promise<object | string> {
    return await this.todosService.getSpecificTodo(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a todo' })
  @ApiParam({ name: 'data', type: 'object' })
  async createTodo(
    @Body() data: { title: string; description: string },
  ): Promise<string> {
    const { title, description } = data;

    return await this.todosService.createTodo(title, description);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a todos' })
  @ApiParam({ name: 'id', type: String })
  async updateTodo(
    @Body() data: { title: string; description: string },
    @Param('id') id: string,
  ): Promise<object | string> {
    const { title, description } = data;

    return await this.todosService.updateTodo(id, title, description);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiParam({ name: 'id', type: String })
  async deleteTodo(@Param('id') id: string): Promise<string> {
    return await this.todosService.deleteTodo(id);
  }
}
