import {ReactText} from "react";

export interface PageQueryParams {
    page: number;
    pageSize: number;
    sort?: string;
    timestamp?: string;
    _export_scope_?: string;
    _export_type_?: string;
}

export interface Sort {
    property: string;
    direction: 'asc' | 'desc';
}

export interface Resp {
    readonly timestamp?: string;
    readonly bizcode: number;
    readonly code: number;
    readonly flag: boolean;
    readonly path: string;
    readonly msg?: string;
    readonly query?: string;
    readonly status?: string;
}

export interface RespPageResult<T> extends Resp {
    data: T[];
    current: number;
    page: number;
    pageSize: number;
    total: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPageNum: number;
}

export interface RespListResult<T> extends Resp {
    data: T[];
}

export interface RespResult<T> extends Resp {
    data: T;
}

export type EntityId = ReactText;
