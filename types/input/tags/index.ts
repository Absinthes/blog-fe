import { TagType } from "@/types/entity";

export interface TagsCreateInput {
  name: string,
  nameEn?: string,
  type: TagType,
  weight?: number
}