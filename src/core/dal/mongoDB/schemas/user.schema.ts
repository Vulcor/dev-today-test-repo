import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: true } })
export class User {
  @Prop({ unique: true, index: true })
  username?: string;

  @Prop()
  password?: string;
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
