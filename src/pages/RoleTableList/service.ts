import request from '@/utils/request';
import { RoleParams, RoleItem } from './data.d';

export async function queryRoles(params?: RoleParams) {
  return request('/api/v1/role', {
    params,
  });
}

export async function removeRole(params: { key: number[] }) {
  return request('/api/v1/role', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRole(params: RoleItem) {
  return request('/api/v1/role', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRole(params: RoleParams) {
  return request('/api/v1/role', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function queryRole(id: RoleItem) {
  return request(`/api/v1/role/${id}`);
}
