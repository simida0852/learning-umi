export interface RoleItem {
  name: string;
  access: string;
  extra: string;
  createdAt: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: RoleItem[];
  pagination: Partial<TableListPagination>;
}

export interface RoleParams {
  id?: string;
  pageSize?: number;
  currentPage?: number;
}
