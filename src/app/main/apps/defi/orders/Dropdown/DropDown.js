import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./dropdown.css";

const DropDown = ({ chainName, setSelected, selected }) => {
  function _onSelect(option) {
    console.log("You selected ", option);
    setSelected(option.value);
  }

  const defaultOption = selected;

  return (
    <div className="dropdown">
      <Dropdown
        options={chainName}
        onChange={_onSelect}
        value={defaultOption}
        placeholder="Select TVL Chains"
      />
    </div>
  );
};

export default DropDown;
