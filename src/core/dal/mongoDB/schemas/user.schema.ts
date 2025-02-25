import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true } })
export class User {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, unique: true, index: true })
  username?: string;

  @Prop({ type: String })
  password?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Event' })
  events: [];
}

export type UserDocument = Document & User;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
};
