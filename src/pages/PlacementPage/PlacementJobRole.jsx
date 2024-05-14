import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import placementApi from "../../apis/placement.api";

const PlacementJobRole = () => {
  const { jobId, jobRole } = useParams();

  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    placementApi.getJobRole({
      jobId,
      success: (res) => {
        setJobData(res.data.data);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  }, [jobId]);

  const parseJobDescription = (description) => {
    const [responsibilitiesText, requirementsText] =
      description.split("Requirements:");

    const responsibilities = responsibilitiesText
      ? responsibilitiesText
          .split("\n")
          .filter((line) => line.trim().startsWith("●"))
          .map((line) => line.trim().slice(1).trim())
      : null;

    const requirements = requirementsText
      ? requirementsText
          .split("\n")
          .filter((line) => line.trim().length > 0)
          .map((line) => line.trim())
      : null;
    return { responsibilities, requirements };
  };

  const { responsibilities, requirements } = jobData.jobDescription
    ? parseJobDescription(jobData.jobDescription)
    : "";

  return (
    <div className="tw-w-auto tw-mt-10 tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
      {/* organisation */}
      <div className="tw-flex tw-gap-6">
        <h4 className="tw-font-bold tw-text-[18px] tw-capitalize">
          {jobData.jobDesignation ? jobData.jobDesignation : ""}
        </h4>
        <div className="tw-flex tw-flex-col">
          <h4 className="tw-font-bold tw-text-xl gradiant-color tw-capitalize">
            {jobData.companyName ? jobData.companyName : ""}
          </h4>
          <p className="tw-text-sm">
            <span className=" tw-inline-block tw-pr-1">
              {" "}
              <svg
                width="9"
                height="12"
                viewBox="0 0 9 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.2 5.7C3.80218 5.7 3.42064 5.54197 3.13934 5.26066C2.85804 4.97936 2.7 4.59783 2.7 4.2C2.7 3.80218 2.85804 3.42064 3.13934 3.13934C3.42064 2.85804 3.80218 2.7 4.2 2.7C4.59782 2.7 4.97936 2.85804 5.26066 3.13934C5.54196 3.42064 5.7 3.80218 5.7 4.2C5.7 4.39698 5.6612 4.59204 5.58582 4.77403C5.51044 4.95601 5.39995 5.12137 5.26066 5.26066C5.12137 5.39995 4.95601 5.51044 4.77402 5.58582C4.59204 5.6612 4.39698 5.7 4.2 5.7ZM4.2 0C3.08609 0 2.0178 0.442499 1.23015 1.23015C0.442499 2.0178 0 3.08609 0 4.2C0 7.35 4.2 12 4.2 12C4.2 12 8.4 7.35 8.4 4.2C8.4 3.08609 7.9575 2.0178 7.16985 1.23015C6.38219 0.442499 5.31391 0 4.2 0Z"
                  fill="url(#paint0_linear_2265_3524)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2265_3524"
                    x1="4.12721"
                    y1="-0.0658714"
                    x2="4.12721"
                    y2="14.5242"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#EB7C49" />
                    <stop offset="1" stop-color="#F04F52" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            {jobData.jobLocation ? jobData.jobLocation : ""} (
            {jobData.workplaceType ? jobData.workplaceType : ""})
          </p>
          <p className="tw-text-sm tw-text-[#858585]">
            Posted on {jobData.postedOn ? jobData.postedOn.split("T")[0] : ""}
          </p>
        </div>
        <button className="tw-ml-auto tw-mb-auto p-2 px-3 tw-font-semibold tw-text-base tw-border-[rgb(235,124,73)] tw-rounded-lg tw-border-2 gradiant-color ">
          Close Application
        </button>
      </div>
      <div className="lo tw-flex tw-gap-6">
        <div className="tw-w-[70%]">
          <div className="tw-border-2 tw-p-5 tw-mt-3 tw-h-auto tw-rounded-xl tw-border-[rgba(0, 0, 0, 0.3)]">
            <h3 className="tw-font-bold tw-text-lg tw-mb-2 tw-text-left">
              {" "}
              Job Description
            </h3>

            {/* {jobData.jobDescription?(jobData.jobDescription):""} */}
            <p className=" tw-font-bold  tw-text-[#656565]">
              Responsibilities:
            </p>
            <ul
              style={{ listStyleType: "disc" }}
              className="tw-list-disc tw-list-inside tw-pl-6 "
            >
              {responsibilities?.map((li, i) => (
                <li key={i} className="tw-text-[#858585]">
                  &#9679; &nbsp;
                  {li}
                </li>
              ))}
            </ul>
            <p className="tw-font-bold  tw-mt-4 tw-text-[#656565]">
              Requirements:
            </p>
            <p className="tw-pl-4  tw-text-justify tw-text-[#858585]">
              {requirements}
            </p>
          </div>
        </div>
        <div className="tw-w-[30%]">
          <div className="tw-border-2 tw-mt-3 tw-h-auto tw-p-4 tw-px-5 tw-overflow-hidden tw-rounded-xl tw-border-[rgba(0, 0, 0, 0.3)]">
            <h3 className="tw-text-black tw-text-base tw-font-bold tw-mt-2">
              Job Type
            </h3>
            <p className="tw-text-[#858585] tw-text-base tw-font-medium">
              {jobData.jobType ? jobData.jobType : ""}
            </p>
            <h3 className="tw-text-black tw-text-base tw-font-bold mt-2">
              No. of Openings
            </h3>
            <p className="tw-text-[#858585] tw-text-base tw-font-medium">
              {jobData.openings ? jobData.openings : 0}
            </p>
            <h3 className="tw-text-black tw-text-base tw-font-bold mt-2">
              No. of Hired Students
            </h3>
            <p className="tw-text-[#858585] tw-text-base tw-font-medium">
              {jobData.hiredCount ? jobData.hiredCount : 0}
            </p>
            <h3 className="tw-text-black tw-text-base tw-font-bold mt-2">
              No. of Applied Students
            </h3>
            <p className="tw-text-[#858585] tw-text-base tw-font-medium">
              {jobData.appliedCount ? jobData.appliedCount : 0}
            </p>
            <h3 className="tw-text-black tw-text-base tw-font-bold tw-mt-2">
              Skills Recommended
            </h3>
            <p className="tw-text-sm tw-gap-2 tw-my-1 tw-flex tw-flex-wrap">
              {jobData.skills
                ? jobData.skills.map((skill, i) => (
                    <span
                      className="tw-p-1 gradiant-color tw-font-medium tw-text-sm tw-rounded-xl tw-border-2 tw-border-[rgb(235,124,73)]"
                      key={i}
                    >
                      {skill}
                    </span>
                  ))
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementJobRole;
