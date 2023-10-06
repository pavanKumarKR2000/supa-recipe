import PropTypes from "prop-types";
import Button from "./Button";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  ChevronRight,
} from "lucide-react";
const Pagination = ({ count, setPage, page, itemsPerPage }) => {
  return (
    <div className="flex items-center justify-center gap-x-4 py-4">
      <Button
        className="py-2 px-4 rounded-md bg-black text-white transition w-max flex items-center gap-x-2"
        disabled={page === 0}
        onClick={() => setPage(0)}
      >
        <ChevronsLeft size={18} />
        <p className="hidden md:block">First Page</p>
      </Button>
      <Button
        className="py-2 px-4 rounded-md bg-black text-white transition w-max flex items-center gap-x-2"
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft size={18} />
        <p className="hidden md:block">Prev</p>
      </Button>
      <p>
        {page + 1} of {Math.ceil(count / itemsPerPage)}
      </p>
      <Button
        className="py-2 px-4 rounded-md bg-black text-white transition w-max flex items-center gap-x-2"
        disabled={count / itemsPerPage <= page + 1}
        onClick={() => setPage(page + 1)}
      >
        <p className="hidden md:block">Next</p>
        <ChevronRight size={18} />
      </Button>
      <Button
        className="py-2 px-4 rounded-md bg-black text-white transition w-max flex items-center gap-x-2"
        disabled={count / itemsPerPage <= page + 1}
        onClick={() => setPage(count / itemsPerPage - 1)}
      >
        <p className="hidden md:block">Last Page</p>
        <ChevronsRight size={18} />
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default Pagination;
