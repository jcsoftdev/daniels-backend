import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Task extends Document {
  @Field(() => String)
  _id: mongoose.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    maxlength: 25,
    unique: true,
    index: true,
  })
  @Field(() => String, { description: 'Task Number (maximum 25 characters)' })
  taskNumber: string;

  @Prop({ type: String, required: true, maxlength: 255 })
  @Field(() => String, { description: 'Task Name (maximum 255 characters)' })
  taskName: string;

  @Prop({ type: String, maxlength: 1500 })
  @Field(() => String, {
    description: 'Task Description (maximum 1500 characters)',
  })
  taskDescription: string;

  @Prop({ type: Date })
  @Field(() => Date, { description: 'Due Date' })
  dueDate: Date;

  @Prop({ type: Date })
  @Field(() => Date, { description: 'Start Date' })
  startDate: Date;

  @Prop({ type: Date })
  @Field(() => Date, { description: 'Start Reminder Emails On' })
  startReminderEmailsOn: Date;

  @Prop({ type: Number })
  @Field(() => Int, { description: 'Reminder Email Frequency (in days)' })
  reminderEmailFrequency: number;

  @Prop({ type: [String] })
  @Field(() => [String], {
    description: 'Send Reminders To (one email address per line)',
  })
  sendRemindersTo: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
