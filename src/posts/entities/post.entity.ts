import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: String, required: true })
  userAuthor: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
