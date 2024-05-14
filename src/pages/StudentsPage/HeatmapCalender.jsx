import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./heatmapcalender.css";

const HeatmapCalender = () => {
  const year = 2024;
  const month = 3;
  const daysInMonth = new Date(year, month, 0).getDate();
  // Create an array of day numbers for the month (1 to )
  const daysArray = Array(35).fill(0);
  const start = new Date(year, month, 1).getDay();
  const end = start + daysInMonth;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //Contributions data
  const data = {
    1: 5,
    2: 8,
    3: 12,
    4: 6,
    5: 10,
    6: 15,
    7: 3,
    8: 7,
    9: 9,
    10: 4,
    11: 11,
    12: 13,
    13: 2,
    14: 8,
    15: 6,
    16: 14,
    17: 5,
    18: 10,
    19: 7,
    20: 3,
    21: 9,
    22: 12,
    23: 4,
    24: 8,
    25: 11,
    26: 6,
    27: 13,
    28: 7,
    29: 5,
    30: 9,
    31: 10,
  };

  return (
    <div className="tw-border-2 tw-mt-3 tw-rounded-xl tw-p-3">
      <ul className="d-flex heatmap-week-container">
        {daysOfWeek.map((week, i) => (
          <li key={i} className="heatmap-week tw-text-xs tw-font-semibold">
            {week}
          </li>
        ))}
      </ul>
      <div className="heatmap-calendar">
        {daysArray.map((day, i) => (
          <div
            key={i}
            data-tooltip-id="day-tooltip"
            className={`${
              i > start && i < end
                ? data[i - start] >= 12
                  ? "first-order "
                  : data[i - start] >= 8 && data[i - start] < 12
                  ? "second-order"
                  : data[i - start] >= 4 && data[i - start] < 8
                  ? "third-order"
                  : "fourth-order"
                : "empty-day"
            } heatmap-day `}
            data-tooltip-content={`${data[i - start]}  Contributions`}
          ></div>
        ))}
      </div>
      <Tooltip id="day-tooltip" />
      <div className="d-flex tw-justify-between tw-mt-4">
        <a className="tw-text-xs tw-underline" href="#">
          How it works?
        </a>
        {/* color scale */}
        <div className="d-flex tw-justify-center tw-text-xs tw-items-center">
          Less
          <div className="tw-h-4 tw-w-4 tw-rounded-md tw-mx-[1.5px] fourth-order"></div>
          <div className="tw-h-4 tw-w-4 tw-rounded-md tw-mx-[1.5px] third-order"></div>
          <div className="tw-h-4 tw-w-4 tw-rounded-md tw-mx-[1.5px] second-order"></div>
          <div className="tw-h-4 tw-w-4 tw-rounded-md tw-mx-[1.5px] first-order"></div>
          More
        </div>
      </div>
    </div>
  );
};

export default HeatmapCalender;
