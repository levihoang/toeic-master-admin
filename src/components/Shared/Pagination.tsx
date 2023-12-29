import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

type PaginationOwn = {
  itemPerPage: number;
  totalItems: number;
  pageCurrent?: number;
  pageChange: (page: number) => void;
  addClass?: string;
};

const PaginationOwn = ({
  itemPerPage,
  totalItems,
  pageChange,
  pageCurrent,
  addClass,
}: PaginationOwn) => {
  const [page, setPage] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(pageCurrent);

  useEffect(() => {
    const getPage = () => {
      const pageCount: number = Math.ceil(totalItems / itemPerPage);
      const current: any = currentPage;
      const delta = 3;
      const range = [];

      for (
        let index: number = Math.max(2, currentPage - delta);
        index <= Math.min(pageCount - 1, current + delta);
        index += 1
      ) {
        range.push(index as number);
      }

      if (current - delta > 2) {
        range.unshift('...');
      }
      if (current + delta < pageCount - 1 && pageCount > 3) {
        range.push('...');
      }
      range.unshift(1);
      if (pageCount !== 1) {
        range.push(pageCount);
      }
      setPage(range);
    };
    getPage();
  }, [currentPage]);

  const changePage = (current: number) => {
    setCurrentPage(current);
    pageChange(current);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemPerPage)) {
      const index = currentPage + 1;
      setCurrentPage(index);
      pageChange(index);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const index = currentPage - 1;
      setCurrentPage(index);
      pageChange(index);
    }
  };

  return (
    <>
      <Pagination className={addClass}>
        <Pagination.Prev onClick={() => prevPage()} />
        {page.map((item: any) => {
          if (item !== '...') {
            if (currentPage === item) {
              return (
                <Pagination.Item active key={`page_${item}`}>
                  {item}
                </Pagination.Item>
              );
            }
            return (
              <Pagination.Item onClick={() => changePage(item)} key={`page_${item}`}>
                {item}
              </Pagination.Item>
            );
          }
          return <Pagination.Ellipsis key={`page_el${item}`} />;
        })}
        <Pagination.Next onClick={() => nextPage()} />
      </Pagination>
    </>
  );
};

export default PaginationOwn;
