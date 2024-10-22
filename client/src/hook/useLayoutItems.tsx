import { useState, useMemo } from 'react';

interface Item {
  trangthai: string;
  ngonngu: string;
  hinhanh: string;
  title: string;
  sotap: string;
}

interface UseItemsDanhmucFilmProps {
  data: Item[];
  itemsPerPage: number;
}

export const useLayoutItems = ({ data, itemsPerPage }: UseItemsDanhmucFilmProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const currentItems = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return Array.isArray(data) ? data.slice(offset, offset + itemsPerPage) : [];
  }, [data, currentPage, itemsPerPage]);

  const pageCount = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return {
    currentItems,
    pageCount,
    handlePageClick,
  };
};

