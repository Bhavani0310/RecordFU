import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import suiteCase from "../../assets/svg/dashboard/suitecase.svg";
import threelines from "../../assets/svg/placement/threelines.svg";
import calender from "../../assets/svg/placement/calender.svg";
import { MostHiringRoles, roles } from "../../constants/placementConstant";
import StatsCard from "./StatsCard";
import ProgressBar from "./ProgressBar";
import placementApi from "../../apis/placement.api";
const PlacementOrganisation = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const { organisationName } = useParams();
  const [hiring, setHiring] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    placementApi.getOrganizationView({
      organisationName,
      success: (res) => {
        setOrganizationData(res.data.data);
        setHiring(res.data.data.mostHiringRoles);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  }, [organisationName]);

  const handleClickJobRole = (jobId, jobRole) => {
    return navigation(`/placement/jobRoleView/${jobId}/${jobRole}`);
  };

  return (
    <section className="tw-w-auto tw-overflow-hidden tw-flex-col tw-min-h-full tw-flex ">
      {/* Title */}
      <div className="tw-w-full tw-flex tw-justify-between">
        <h4 className="tw-font-bold tw-text-[18px] tw-mt-2 tw-mb-3 tw-capitalize">
          {organisationName}
        </h4>
        <div className="tw-flex tw-mt-2 tw-mb-3 tw-justify-end">
          <select
            className="tw-text-right tw-text-[#858585] tw-border-none tw-outline-none"
            name="sort"
            id="sort"
          >
            <option value="Date created" selected>
              Date created
            </option>
            <option value="Name">Name</option>
            <option value="Recently">Recently</option>
          </select>
        </div>
      </div>
      <div className="tw-flex">
        {/* organisation */}
        <div className=" tw-flex-1 tw-flex-grow">
          <div className="tw-border-2 tw-max-h-[610px]  tw-p-4 tw-overflow-hidden tw-overflow-y-scroll tw-rounded-md tw-border-[rgba(0, 0, 0, 0.3)]">
            {/* top */}
            <div className="tw-flex tw-justify-between tw-mb-6">
              {/* total students hired */}
              <div className="p-2 tw-my-auto">
                <h2
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                  className="tw-text-[40px] gradiant-color   tw-font-extrabold"
                >
                  {organizationData.totalStudentsHired}
                </h2>
                <h3 className="tw-text-[18px] tw-font-semibold  tw-capitalize ">
                  total students hired
                </h3>
              </div>
              {/* total students applied for job */}
              <StatsCard
                icon={threelines}
                value={organizationData.totalStudentsApplied}
                text={"total students applied for job"}
                textStyle={"tw-text-lg tw-font-semibold"}
              />
            </div>
            {/* most hiring roles */}
            <h3 className="tw-capitalize tw-text-lg tw-font-semibold">
              most hiring roles
            </h3>
            <div className="tw-flex tw-justify-between tw-w-full tw-h-max ">
              {/* bar chart */}
              <div className="tw-w-[64%] tw-max-h-[450px] tw-overflow-y-scroll border_light tw-p-2 tw-px-3 ">
                {hiring.map((role, i) => (
                  <ProgressBar key={i} item={role} />
                ))}
              </div>
              <div className="tw-w-[33%] tw-gap-4 tw-flex tw-flex-col tw-h-full">
                {/* total posted job */}
                <StatsCard
                  icon={suiteCase}
                  value={
                    organizationData.totalJobsPosted
                      ? organizationData.totalJobsPosted
                      : 0
                  }
                  text={"Total Posted Jobs"}
                  textStyle={"tw-text-gray-500 tw-font-semibold"}
                />
                {/* year started hiring */}
                <StatsCard
                  iconWidth="25px"
                  icon={calender}
                  value={
                    organizationData.oldestPostedDate
                      ? organizationData.oldestPostedDate
                          .split("T")[0]
                          .split("-")[0]
                      : 0
                  }
                  text={"Total Posted Jobs"}
                  textStyle={"tw-text-gray-500 tw-font-semibold"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* hiring Roles */}
        <div className="tw-flex-1 tw-flex tw-h-full  tw-flex-col tw-items-end tw-w-[90%]">
          {/* list */}
          <div className="tw-border-2 tw-w-[90%]  tw-max-h-[605px] tw-overflow-y-scroll tw-overflow-hidden tw-divide-y-2 tw-rounded-md tw-border-[rgba(0, 0, 0, 0.3)]">
            {organizationData.jobsWithCounts
              ? organizationData.jobsWithCounts.map((li, i) => (
                  <div
                    className="tw-flex tw-flex-col tw-cursor-pointer tw-p-4  tw-justify-center tw-items-start"
                    key={i}
                  >
                    <h5
                      className="tw-font-bold tw-text-black tw-text-lg"
                      onClick={() =>
                        handleClickJobRole(li.jobId, li.jobDesignation)
                      }
                    >
                      {li.jobDesignation} |
                      <span className="tw-pl-2 tw-capitalize gradiant-color">
                        {li.jobLocation}
                      </span>
                    </h5>
                    <p className="tw-text-[#9A9A9A] tw-text-sm">{`${li.appliedCount} Students Applied | ${li.hiredCount} Students Placed`}</p>
                  </div>
                ))
              : " "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementOrganisation;
