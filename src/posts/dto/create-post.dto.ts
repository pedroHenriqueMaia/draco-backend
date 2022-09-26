export class CreatePostDto {
  title: string;
  date: string;
  userAuthor: string;
  likes: { totalLikes: number; users: string[] };
  comments: { user: string; message: string }[];
}
