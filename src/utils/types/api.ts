export interface IResponse<TData> extends IPaginationData<TData> {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export interface IMessage {
  status_code: number;
  status_message: string;
}

export interface IFailed extends IMessage {
  success: boolean;
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
