import { EntityId } from '@/services/data';

export interface News {
  content: string;
  title: string;
  url: string;
  __v: number;
  _id: string;
}

export interface News_Create extends News {
  [key: string]: any;
}

export interface News_Modify extends News {
  id: EntityId;

  [key: string]: any;
}
export interface News_Patch extends Partial<News_Modify> {
  id: EntityId;
}
