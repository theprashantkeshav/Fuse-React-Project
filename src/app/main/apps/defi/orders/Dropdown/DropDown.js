import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./dropdown.css";

const DropDown = ({ chainName, setSelected }) => {
  function onSelect(option) {
    setSelected(option);
  }

  return (
    <div className="dropdown">
      <Dropdown
        options={chainName}
        onChange={onSelect()}
        placeholder="Select TVL Chains"
      />
    </div>
  );
};

export default DropDown;
