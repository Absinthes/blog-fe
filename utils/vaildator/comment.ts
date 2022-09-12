import { IsEmail, IsNotEmpty, IsUrl, MaxLength, MinLength } from "class-validator"


export class CommentVaildator{
  @IsEmail({},{
    message:"请输入正确的邮箱"
  })
  @IsNotEmpty({
    message:"邮箱不能为空"
  })
  email:string

  @IsNotEmpty({
    message:"不能为空"
  })
  @MaxLength(10,{
    message:"昵称长度不符合,2-10之间"
  })
  @MinLength(2)
  name:string

  
  @IsUrl({},{
    message:"请输入正确的地址"
  })
  link:string

  @IsNotEmpty({
    message:"内容不允许为空"
  })
  content:string
}