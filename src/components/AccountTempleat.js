import React from "react";
import "../style/AccountTempleat.scss";

const AccountTempleat = ({ children }) => {
  return (
    <div className="body">
      <div className="wrap"> {children}</div>
     
    </div>
  );
};

export default AccountTempleat;
