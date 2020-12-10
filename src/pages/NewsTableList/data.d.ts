export interface NewsItem {
  id?: string;
  title: string;
  content: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: NewsItem[];
  pagination: Partial<TableListPagination>;
}

export interface NewsParams {
  id?: string;
  pageSize?: number;
  currentPage?: number;
}
