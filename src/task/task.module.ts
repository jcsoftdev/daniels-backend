import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/task/entities/task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  providers: [TaskResolver, TaskService],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
})
export class TaskModule {}
