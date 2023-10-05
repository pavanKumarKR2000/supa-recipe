import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button {...props} className={twMerge("px-3 py-2", className)}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
