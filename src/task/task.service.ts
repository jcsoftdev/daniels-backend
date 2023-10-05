import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/task/entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    try {
      const newTask = await this.taskModel.create(createTaskInput);

      return newTask;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Task number already exists');
      }
      console.log(error);
      throw new InternalServerErrorException('Error creating task');
    }
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    return tasks;
  }

  async findOneByTaskNumber(taskNumber: string): Promise<Task> {
    const task = await this.taskModel.findOne({ taskNumber }).exec();
    console.log({ task });
    return task;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    return task;
  }

  async findByDate(date: Date): Promise<Task[]> {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const tasks = await this.taskModel
      .find({
        $expr: {
          $and: [
            { $eq: [{ $year: '$dueDate' }, year] },
            { $eq: [{ $month: '$dueDate' }, month] },
            { $eq: [{ $dayOfMonth: '$dueDate' }, day] },
          ],
        },
      })
      .exec();
    return tasks;
  }

  async update(id: string, updateTaskInput: UpdateTaskInput) {
    const taskToUpdate = await this.findOne(id);
    if (!taskToUpdate) {
      throw new BadRequestException('Task not found');
    }

    try {
      const updatedTask = await this.taskModel.findByIdAndUpdate(
        id,
        updateTaskInput,
        { new: true },
      );

      return updatedTask;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error updating task');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
