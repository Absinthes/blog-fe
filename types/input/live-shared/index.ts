export interface LiveSharedCreateInput {
  content: string;
  tags: string[];
  weight?: number;
  address?: string;
  emotion?: string;
  file?: File;
}

export interface LiveSharedUpdateInput {
  id: string;
  content?: string;
  tags?: string[];
  weight?: number;
  address?: string;
  emotion?: string;
  file?: File;
}
