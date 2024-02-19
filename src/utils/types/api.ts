export interface Response<TData> extends PaginationData<TData> {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export interface PaginationData<TData> {
  page: number;
  results: TData;
  total_pages: number;
  total_results: number;
}
