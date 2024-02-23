import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { buildQueryString, generatePagesToDisplay } from "@/utils/formatter";
import { Params } from "@/utils/types/api";

interface Props {
  page?: number;
  total_pages?: number;
  query?: Params;
}

const Pagination = (props: Props) => {
  const { page, total_pages, query } = props;
  const params = buildQueryString({ ...query, page: "" });
  let total = total_pages;

  if (total_pages) {
    total = total_pages > 500 ? 500 : total_pages;
  }

  return (
    <PaginationUI>
      <PaginationContent>
        <PaginationPrevious
          href={page === 1 ? undefined : `${params}&page=${page! - 1}`}
        />
        {generatePagesToDisplay(page!, total!).map((value, index) => {
          if (value === "...") {
            return <PaginationEllipsis key={`${value}-${index}`} />;
          }

          return (
            <PaginationLink
              key={`${page}-${index}`}
              href={page === value ? undefined : `${params}&page=${value}`}
              isActive={page === value}
            >
              {value}
            </PaginationLink>
          );
        })}
        <PaginationNext
          href={
            page === total || total === 0
              ? undefined
              : `${params}&page=${page! + 1}`
          }
        />
      </PaginationContent>
    </PaginationUI>
  );
};

export default Pagination;
