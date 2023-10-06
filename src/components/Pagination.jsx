import PropTypes from "prop-types";
import Button from "./Button";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  ChevronRight,
} from "lucide-react";
const Pagination = ({ count }) => {
  return (
    <div className="flex items-center justify-center gap-x-4 py-4">
      <Button className="py-2 px-4 rounded-md bg-black text-white transition w-max flex items-center gap-x-2 ">
        <ChevronsLeft size={18} />
        <p>First Page</p>
      </Button>
      <Button className="py-2 px-4 rounded-md bg-black text-white transition w-max flex items-center gap-x-2 ">
        <ChevronLeft size={18} />
        <p>Prev</p>
      </Button>
      <p>1 of {Math.ceil(count / 10)}</p>
      <Button className="py-2 px-4 rounded-md bg-black text-white transition w-max flex items-center gap-x-2 ">
        <p>Next</p>
        <ChevronRight size={18} />
      </Button>
      <Button className="py-2 px-4 rounded-md bg-black text-white transition w-max flex items-center gap-x-2 ">
        <p>Last Page</p>
        <ChevronsRight size={18} />
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Pagination;
