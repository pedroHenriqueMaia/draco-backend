import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post, PostSchema } from 'src/posts/entities/post.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [PostSchema] })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
