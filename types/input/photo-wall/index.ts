
export type CreateOrUpdatePhotoInput = {
  name: string;
  file: File;
  originUrl?: string;
  author?: string;
  tags?: string[];
  type?:string
}
