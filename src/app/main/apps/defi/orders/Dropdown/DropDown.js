import React from "react";
import Dropdown from "react-dropdown";
import withRouter from "@fuse/core/withRouter";
import "react-dropdown/style.css";
import "./dropdown.css";

const DropDown = (props) => {
  function _onSelect(option) {
    // props.setSelected(option.value);
    props.navigate(`/protocol/${option.value}`);
  }

  return (
    <div className="dropdown">
      <Dropdown
        options={props.chainName}
        onChange={_onSelect}
        placeholder="Select TVL Chains"
      />
    </div>
  );
};

export default withRouter(DropDown);
