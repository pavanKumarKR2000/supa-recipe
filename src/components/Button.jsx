import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Button = ({ children, className = "", disabled = false, ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(
        "px-3 py-2",
        className,
        disabled && "bg-gray-500 cursor-not-allowed"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export default Button;
