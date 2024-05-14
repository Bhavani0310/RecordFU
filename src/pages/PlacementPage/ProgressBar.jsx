import React from "react";
import tick from "../../assets/svg/dashboard/tick.svg";

const ProgressBar = ({ item }) => {
  let progressbar = (item.hiredCount / item.appliedCount) * 100;
  return (
    <>
      <p>{item.designation}</p>
      <div className="d-flex  justify-center items-baseline">
        <div
          className="progress "
          role="progressbar"
          aria-label="Basic example"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: "100%" }}
        >
          <div className="progress-bar" style={{ width: progressbar }}></div>
        </div>
        <p>{item.value || `${progressbar}%`}</p>
        <img src={tick} alt="tick" style={{ height: "3vh" }} />
      </div>
    </>
  );
};

export default ProgressBar;
