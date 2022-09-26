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

  @Prop({ type: { totalLikes: Number, users: [String] } })
  likes: { totalLikes: number; users: string[] };

  @Prop({
    type: {
      totalComments: Number,
      allComments: [{ user: String, message: String }],
    },
  })
  comments: {
    totalComments: number;
    allComments: { user: string; message: string }[];
  };
}

export const PostSchema = SchemaFactory.createForClass(Post);
