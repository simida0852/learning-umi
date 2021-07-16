import { EntityId } from '@/services/data';

export interface Poems {
  p_index: String;
  p_name: String;
  p_content: String;
  p_author: String;
  p_dynasty: String;
  p_img_url: String;
  [key: string]: any;
}

export interface Poems_Create extends Poems {
  [key: string]: any;
}

export interface Poems_Modify extends Poems {
  id: EntityId;
  [key: string]: any;
}
export interface Poems_Patch extends Partial<Poems_Modify> {
  id: EntityId;
}
