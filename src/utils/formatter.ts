import { Params } from "./types/api";

export const generatePagesToDisplay = (
  currentPage: number,
  totalPages: number
) => {
  const maxPagesToShow = 5;
  let pagesToDisplay: (number | string)[] = [currentPage];

  if (totalPages <= maxPagesToShow) {
    pagesToDisplay = [...Array(totalPages).keys()].map((page) => page + 1);
  } else if (currentPage <= 3) {
    pagesToDisplay = [1, 2, 3, 4, "...", totalPages];
  } else if (currentPage >= totalPages - 2) {
    pagesToDisplay = [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pagesToDisplay = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }

  return pagesToDisplay;
};

export const buildQueryString = (params?: Params): string => {
  if (!params) {
    return "";
  }

  const queryParams: string[] = [];

  let key: keyof typeof params;
  for (key in params) {
    if (params[key]?.length !== 0) {
      queryParams.push(`${key}=${params[key]}`);
    }
  }

  return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
};
