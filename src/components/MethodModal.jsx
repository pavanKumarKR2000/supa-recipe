import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useMemo, useRef } from "react";

const MethodModal = ({ method, ingredients = "", setShowMethodModal }) => {
  const methodContentRef = useRef(null);

  const ingredientsArr = useMemo(() => {
    const arr = [];

    ingredients.split(",").map(
      (item, index) => {
        arr.push(
          <div className="p-3 rounded-md bg-blue-50" key={index}>
            {item}
          </div>
        );
      },
      [ingredients]
    );

    return arr;
  }, [ingredients]);

  const handleClick = (e) => {
    if (e.target.firstChild === methodContentRef.current) {
      setShowMethodModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 mt-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]"
      onClick={handleClick}
    >
      <div
        className="p-6 rounded-md bg-white flex flex-col gap-y-3 h-[90%] md:h-auto w-[95%] md:w-[70%] lg:w-[35%] "
        ref={methodContentRef}
      >
        <div className="flex items-center justify-between p-2">
          <h2 className="text-3xl font-bold italic">Instructions</h2>
          <X
            size={18}
            className="cursor-pointer"
            onClick={() => setShowMethodModal(false)}
          />
        </div>
        {ingredients.trim().length > 0 && (
          <div className="space-y-2 p-2">
            <p>Ingredients</p>
            <div className="flex items-center gap-x-2 gap-y-2 flex-wrap max-h-[110px] overflow-y-scroll">
              {ingredientsArr}
            </div>
          </div>
        )}
        <div className="h-[90%] md:h-[350px] overflow-y-scroll p-2">
          {method}
        </div>
      </div>
    </div>
  );
};

MethodModal.propTypes = {
  method: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  setShowMethodModal: PropTypes.func.isRequired,
};

export default MethodModal;
