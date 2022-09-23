import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  @Prop({ type: String, required: true })
  user: string;

  @Prop({ type: String, required: true })
  post: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
