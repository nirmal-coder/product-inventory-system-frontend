import React from "react";

const DropDown = ({ data, onChangeHandler, dropDownType, value }) => {
  return (
    <select
      name="dropdown"
      className="w-full px-3 py-2 text-xs lg:text-sm
          "
      onChange={(e) => onChangeHandler(e.target.value, dropDownType)}
      value={value}
      onClick={(e) => e.stopPropagation()}
    >
      {dropDownType === "category"
        ? data.map((item) => (
            <option
              key={item.name}
              value={item.value}
              onClick={(e) => e.stopPropagation()}
            >
              {item.name}
            </option>
          ))
        : data.map((name) => (
            <option
              key={name}
              value={name}
              onClick={(e) => e.stopPropagation()}
            >
              {name}
            </option>
          ))}
    </select>
  );
};

export default DropDown;
