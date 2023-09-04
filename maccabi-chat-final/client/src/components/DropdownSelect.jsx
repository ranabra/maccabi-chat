import React, { useState } from "react";

function DropdownSelect({
  list,
  defaultText,
  elementId,
  elementName,
  selectedOption,
  onOptionChange,
}) {
  const handleChange = (event) => {
    onOptionChange(event.target.value);
  };

  return (
    <div>
      <select onChange={handleChange} value={selectedOption}>
        <option value="">{defaultText}</option>
        {list.map((option) => (
          <option key={option[elementId]} value={option[elementId]}>
            {option[elementName]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownSelect;
