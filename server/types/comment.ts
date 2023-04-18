export type TComment = {
  _id?: string;
  username: string;
  userEmail: string;
  text: string;
  like: number;
  subComments?: string[];
  taggedUsers: Array<string>;
};
