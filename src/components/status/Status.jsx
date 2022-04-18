import React from "react";
import { useSelector } from "react-redux";
import "./status.css";

const Status = ({ status }) => {
  const theme = useSelector((state) => state.theme.theme);

  let color;

  if (status === "Paid") {
    color = "green";
  } else if (status === "Pending") {
    color = "orange";
  } else {
    color = "grey";
  }

  return (
    <div className={theme === "dark_mode" ? "status_dark" : "status_light"}>
      <div className={`status ${color} `}>
        <span className="dot"></span>

        <span
          className={`status_name ${
            theme === "dark_mode" ? "color_dark" : "color_light"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default Status;
