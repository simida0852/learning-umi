import request from '@/utils/request';
import { News, News_Create, News_Modify, News_Patch } from '@/models/news';
import { EntityId, PageQueryParams, RespPageResult, RespResult } from '@/services/data';

export interface NewsPageQueryParams extends Partial<PageQueryParams> {
  ids?: EntityId[];
  searchText?: string;
}

export async function queryNewss(params?: NewsPageQueryParams): Promise<RespPageResult<News>> {
  return request('/api/v1/news', {
    params,
  });
}
export async function queryNews(bizId: EntityId): Promise<RespResult<News>> {
  return request(`/api/v1/news/${bizId}`);
}

export async function createNews(entity: News_Create): Promise<RespResult<any>> {
  return request(`/api/v1/news`, {
    method: 'POST',
    data: entity,
  });
}

export async function modifyNews(entity: News_Modify): Promise<RespResult<any>> {
  return request(`/api/v1/news/${entity.id}`, {
    method: 'PUT',
    data: entity,
  });
}

export async function patchNews(entity: News_Patch): Promise<RespResult<any>> {
  return request(`/api/v1/news/${entity.id}`, {
    method: 'PATCH',
    data: entity,
  });
}

export async function deletedNews(id: EntityId): Promise<RespResult<any>> {
  return request(`/api/v1/news/${id}`, {
    method: 'DELETE',
  });
}

export async function deletedNewss(bizIds?: EntityId[]): Promise<RespResult<any>> {
  return request('/api/v1/news', {
    method: 'DELETE',
    data: {
      ids: bizIds,
    },
  });
}
