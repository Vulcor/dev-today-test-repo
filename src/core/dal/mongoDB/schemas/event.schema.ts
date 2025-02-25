import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true } })
export class Event {
  @Prop({ _id: false })
  _id: Types.ObjectId;

  @Prop({ type: String })
  name: string;

  @Prop()
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export type EventDocument = Document & Event;

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
};
