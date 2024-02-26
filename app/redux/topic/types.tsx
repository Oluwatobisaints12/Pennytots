export interface ITopic {
  name: string;
  content: string;
  image?: string;
  video?: string;
}

export interface ICreateSubCommentDTO {
  commentId: string;
  data: any;
}

export interface ICreateCommentDTO {
  postId: string;
  data: any;
}
