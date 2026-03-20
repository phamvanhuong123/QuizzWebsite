import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // Các props mới thêm vào để hiển thị text "Showing X of Y items"
  totalItems?: number;
  itemsPerPage?: number;
  itemName?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  itemName = "items",
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Tính toán số lượng item đang hiển thị trên trang hiện tại
  const currentItemsCount =
    currentPage === totalPages && totalItems % itemsPerPage !== 0
      ? totalItems % itemsPerPage
      : Math.min(itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between w-full py-4 mt-4 border-t border-slate-200 dark:border-slate-700">
      {/* Thông tin hiển thị bên trái */}
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Showing {currentItemsCount} of {totalItems} {itemName}
      </div>

      {/* Cụm nút chuyển trang bên phải */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-9 px-2 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              currentPage === page
                ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
