import React from "react";

const Card = ({
  logo,
  tick,
  title,
  tag,
  btn,
  btnLogo,
  tagColor,
  desc,
  year,
  about,
}) => {
  return (
    <div className="d-flex px-4 p-3 tw-mt-4 border-2 tw-justify-start tw-items-start tw-gap-2 tw-rounded-xl">
      <div className="logo">
        <img
          src={logo}
          className="tw-h-[50px]  tw-w-[50px]"
          alt="institue logo"
        />
      </div>
      <div className="content tw-w-full">
        {/* Title */}
        <h3 className="tw-font-bold tw-text-xl">
          {title}
          {tick && (
            <img
              className="tw-inline-flex tw-h-4 tw-w-auto"
              src={tick}
              alt="tick"
            />
          )}
        </h3>
        {/* Description */}
        <p className="tw-text-lg">{desc}</p>
        {/* Year */}
        <p className="tw-text-base tw-text-[#8F8F8F]">{year}</p>
        {/* Tags */}
        <div className="d-flex gap-3 tw-my-2 tw-flex-wrap">
          {tag &&
            tag.map((item, i) => (
              <div
                key={i}
                className={`${
                  tagColor === "primary"
                    ? "tw-text-[#EB7C49]"
                    : "tw-text-[#8F8F8F]"
                } tw-text-sm tw-font-medium tw-p-1 tw-px-2 tw-bg-[#F9F9F9] tw-rounded-xl`}
              >
                {item}
              </div>
            ))}
        </div>
        {/* About */}
        {about && (
          <p className="tw-font-medium tw-text-[17px] tw-mt-3 tw-mb-2">
            {about.length >= 120 ? about.slice(0, 140) + "..." : about}
            {about.length >= 120 && (
              <span className="tw-w-full tw-inline lg:tw-ml-52 tw-ml-24 tw-text-base tw-text-[#8F8F8F] tw-font-medium  tw-cursor-pointer">
                ...readmore
              </span>
            )}
          </p>
        )}
        {/* Button */}
        {btn && (
          <div className="tw-w-full tw-items-center  tw-flex tw-justify-end">
            <button className=" tw-text-black tw-font-semibold tw-text-sm tw-border-2 tw-p-2 tw-rounded-lg tw-border-[rgb(235,124,73)]">
              {btn}{" "}
              <img
                className="tw-inline-flex tw-h-4 tw-font-semibold tw-w-4"
                src={btnLogo}
                alt=""
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
