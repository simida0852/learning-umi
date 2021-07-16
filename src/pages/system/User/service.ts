import request from '@/utils/request';

export async function queryUsers(params?: any) {
  return request('/api/v1/users', {
    params,
  });
}
export async function queryUser(paramsId?: any) {
  return request(`/api/v1/user/${paramsId}`);
}

export async function addUser(params?: any) {
  return request('/api/v1/user', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeUser(params?: any) {
  return request(`/api/v1/user/${params}`, {
    method: 'DELETE',
  });
}

export async function UpdateUser(params?: any) {
  return request(`/api/v1/user/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
