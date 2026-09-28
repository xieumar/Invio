interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface FilterState {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

type SortDirection = "asc" | "desc";

type DateRangePreset = "30d" | "90d" | "6m" | "ytd" | "all";

interface DateRangeCustom {
  from: string;
  to: string;
}

type DateRangeFilter = DateRangePreset | DateRangeCustom;

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface PaginationParams {
  page: number;
  pageSize: number;
}

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
