import * as React from "react";
import "./shell.scss";

export const Shell: React.FC<{}> = (props) => {
  return (
    <div className="shell">
      <main>{props.children}</main>
    </div>
  );
};
