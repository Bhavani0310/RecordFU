import React from "react";

const StatsCard = ({
  icon,
  value,
  fontSize,
  iconWidth,
  textStyle,
  text,
  cardWidth,
  padding,
}) => {
  return (
    <div
      className={`  tw-border ${
        padding ? padding : "tw-p-4"
      }   tw-rounded-lg tw-mb-1`}
      style={{ width: cardWidth ? cardWidth : "" }}
    >
      <div className="d-flex align-items-center gap-3">
        <img
          src={icon}
          alt=""
          style={{ width: iconWidth ? iconWidth : "2vw" }}
        />
        <strong
          style={{
            fontSize: fontSize ? fontSize : " xx-large",
            color: "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
            borderColor:
              "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
            color: " rgba(240, 79, 82, 1)",
          }}
          className="gradiant-color"
        >
          {value}
        </strong>
      </div>
      <p className={`tw-capitalize ${textStyle && textStyle}`}>{text}</p>
    </div>
  );
};

export default StatsCard;
