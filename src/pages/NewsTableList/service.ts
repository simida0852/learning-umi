import request from '@/utils/request';
import { NewsParams } from './data';

export async function queryNews(params: NewsParams) {
  return request('/api/v1/news', {
    params,
  });
}
export async function queryNew(id: NewsParams) {
  return request(`/api/v1/news/${id}`);
}
