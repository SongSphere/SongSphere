export type TComment = {
  _id?: string;
  username: string;
  userEmail: string;
  text: string;
  subComments?: string[];
  like: number;
};
