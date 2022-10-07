export type MultimediaCreateInput = {
  title: string;
  type?: string;
  author?: string;
  file?: File;
  coverFile?: File;
  weight?: number;
  tags?: string[];
};

export type MultimediaUpdateInput = {
  id: string
  title?: string;
  type?: string;
  author?: string;
  file?: File;
  coverFile?: File;
  weight?: number;
  tags: string[];
};
