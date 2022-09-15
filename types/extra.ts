import { Article } from "./entity"

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


export type StatisticsArticle  = {
  year:number
  data?:Article[]
  length?:number
}