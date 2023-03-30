export type TPopulatedComment = {
  _id: string;
  username: string;
  profileImgUrl: string;
  userEmail: string;
  text: string;
  subComments: TPopulatedComment[];
};
