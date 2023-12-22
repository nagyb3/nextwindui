export type TPost = {
  id: number;
  title: string;
  text: string;
  created_at: string;
  users_who_upvoted?: string[];
  users_who_downvoted?: string[];
  author_username: string;
  subforum_name: string;
};
