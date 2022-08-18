export interface CommentItem {
  id: string;
  created_at: string;
  user: User;
  content: string;
  movie_slug: string;
  reactions: Reaction[];
}
interface User {
  id: string;
  created_at: string;
  photo_url: string;
  display_name: string;
  email: string;
}

interface Reaction {
  user: string;
  comment: string;
  created_at: string;
  value: 0 | 1 | 2;
}
