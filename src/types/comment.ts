export interface CommentItem {
  id: string;
  created_at: string;
  user: User;
  content: string;
  movie_slug: string;
  reactions: any[];
}
interface User {
  id: string;
  created_at: string;
  photo_url: string;
  display_name: string;
  email: string;
}
