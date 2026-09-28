export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface FilterState {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

export type SortDirection = "asc" | "desc";

export type DateRangePreset = "30d" | "90d" | "6m" | "ytd" | "all";

export interface DateRangeCustom {
  from: string;
  to: string;
}

export type DateRangeFilter = DateRangePreset | DateRangeCustom;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
