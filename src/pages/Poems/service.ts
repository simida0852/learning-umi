import request from '@/utils/request';
import { Poems, Poems_Create, Poems_Modify, Poems_Patch } from '@/models/poems';
import { EntityId, PageQueryParams, RespPageResult, RespResult } from '@/services/data';

export interface PoemsPageQueryParams extends Partial<PageQueryParams> {
  ids?: EntityId[];
  searchText?: string;
}

export async function queryPoemss(params?: PoemsPageQueryParams): Promise<RespPageResult<Poems>> {
  return request('/api/v1/poems', {
    params,
  });
}
export async function queryPoems(bizId: EntityId): Promise<RespResult<Poems>> {
  return request(`/api/v1/poems/${bizId}`);
}

export async function createPoems(entity: Poems_Create): Promise<RespResult<any>> {
  return request(`/api/v1/poems`, {
    method: 'POST',
    data: entity,
  });
}

export async function modifyPoems(entity: Poems_Modify): Promise<RespResult<any>> {
  return request(`/api/v1/poems/${entity.id}`, {
    method: 'PUT',
    data: entity,
  });
}

export async function patchPoems(entity: Poems_Patch): Promise<RespResult<any>> {
  return request(`/api/v1/poems/${entity.id}`, {
    method: 'PATCH',
    data: entity,
  });
}

export async function deletedPoems(id: EntityId): Promise<RespResult<any>> {
  return request(`/api/v1/poems/${id}`, {
    method: 'DELETE',
  });
}

export async function deletedPoemss(bizIds?: EntityId[]): Promise<RespResult<any>> {
  return request('/api/v1/poems', {
    method: 'DELETE',
    data: {
      ids: bizIds,
    },
  });
}
