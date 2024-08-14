import { Paginated } from "@/types/types";
import { InfiniteData } from "@tanstack/react-query";

export const appendNewRowInfiniteTable = <T>({
  prev,
  newItem,
}: {
  prev: InfiniteData<Paginated<T>, unknown> | undefined;
  newItem: T;
}) => {
  const firstPage = prev ? prev.pages.splice(0, 1)[0] : { page: [], total: 0 };
  const pages = prev ? prev.pages : [];

  return {
    pages: [
      {
        ...firstPage,
        page: [{ ...newItem, rowState: "NEW" }, ...firstPage.page],
      },
      ...pages,
    ],
    pageParams: prev ? prev.pageParams : [],
  };
};
