import request from '@/utils/request';
import { NewsParams } from './data';

// export async function queryRule(params?: TableListParams) {
//   return request('/api/rule', {
//     params,
//   });
// }

// export async function removeRule(params: { key: number[] }) {
//   return request('/api/rule', {
//     method: 'POST',
//     data: {
//       ...params,
//       method: 'delete',
//     },
//   });
// }

// export async function addRule(params: TableListItem) {
//   return request('/api/rule', {
//     method: 'POST',
//     data: {
//       ...params,
//       method: 'post',
//     },
//   });
// }

// export async function updateRule(params: TableListParams) {
//   return request('/api/rule', {
//     method: 'POST',
//     data: {
//       ...params,
//       method: 'update',
//     },
//   });
// }

export async function queryNews(params: NewsParams) {
  return request('/api/v1/news', {
    params,
  });
}
export async function queryNew(id: NewsParams) {
  return request(`/api/v1/news/${id}`);
}
