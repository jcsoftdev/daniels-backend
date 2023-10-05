import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTaskInput } from './create-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  taskNumber?: string;

  @Field(() => String, { nullable: true })
  taskName?: string;

  @Field(() => String, { nullable: true })
  taskDescription?: string;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  startReminderEmailsOn?: Date;

  @Field(() => Number, { nullable: true })
  reminderEmailFrequency?: number;

  @Field(() => [String], { nullable: true })
  sendRemindersTo?: string[];
}
