type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav className="flex items-center justify-center gap-3 py-4">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 disabled:opacity-50 hover:cursor-pointer hover:bg-blue-300"
      >
        Prev
      </button>
      <span className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 disabled:opacity-50 hover:cursor-pointer  hover:bg-blue-300"
      >
        Next
      </button>
    </nav>
  );
}
