import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => String, { description: 'Task Number' })
  taskNumber: string;

  @Field(() => String, { description: 'Task Name' })
  taskName: string;

  @Field(() => String, { description: 'Task Description' })
  taskDescription: string;

  @Field(() => Date, { description: 'Due Date' })
  dueDate: Date;

  @Field(() => Date, { description: 'Start Date' })
  startDate: Date;

  @Field(() => Date, { description: 'Start Reminder Emails On' })
  startReminderEmailsOn: Date;

  @Field(() => Int, { description: 'Reminder Email Frequency' })
  reminderEmailFrequency: number;

  @Field(() => [String], { description: 'Send Reminders To' })
  sendRemindersTo: string[];
}
