export type Emoji = {
  [k in string]:{
    name:string,
    data:{
      mean?:string,
      value:string
    }[]
  }
}

export type EditForm = {
  email: string,
  link: string,
  name: string,
  content: string,
}