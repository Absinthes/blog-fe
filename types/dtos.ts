import { CommentTypeEnum } from "./entity"

export type createCommentInput = {
  type:CommentTypeEnum
  name:string
  content:string
  email:string
  browser:string
  envirconment:string
  article?:string
  rootComment?:string
  parentComment?:string
}