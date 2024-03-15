export interface IResponse<TData> extends IPaginationData<TData> {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export interface IPaginationData<TData> {
  page: number;
  results: TData;
  total_pages: number;
  total_results: number;
}

export interface IParams {
  [key: string]: string | string[] | undefined;
}
