import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { OrdersMeta } from "@/data-access/get-orders";

type Props = {
  meta: OrdersMeta;
  searchParams: Record<string, string | undefined>;
};

function buildUrl(
  page: number,
  searchParams: Record<string, string | undefined>,
) {
  const params = new URLSearchParams({
    ...(searchParams as Record<string, string>),
    page: String(page),
  });
  return `?${params.toString()}`;
}

function getPageNumbers(current: number, last: number): (number | "...")[] {
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(last - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }

  if (current < last - 2) pages.push("...");

  pages.push(last);

  return pages;
}

export default function Pagination({ meta, searchParams }: Props) {
  const { current_page, last_page } = meta;
  const pages = getPageNumbers(current_page, last_page);

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildUrl(current_page - 1, searchParams)}
            aria-disabled={current_page === 1}
            className={
              current_page === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {pages.map((page, i) =>
          page === "..." ? (
            <PaginationItem
              key={`ellipsis-${i}`}
              className="hidden md:inline-flex"
            >
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page} className="hidden md:inline-flex">
              <PaginationLink
                href={buildUrl(page, searchParams)}
                isActive={page === current_page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href={buildUrl(current_page + 1, searchParams)}
            aria-disabled={current_page === last_page}
            className={
              current_page === last_page ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
