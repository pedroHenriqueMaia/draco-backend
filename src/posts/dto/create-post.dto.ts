export class CreatePostDto {
  title: string;
  date: string;
  userAuthor: string;
  likes: { totalLikes: number; users: string[] };
  comments: {
    totalComments: number;
    allComments: { user: string; message: string }[];
  };
}
