import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placementApi from "../../apis/placement.api";
const PlacementHomePage = () => {
  const [organization, setOrganization] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    placementApi.getHomePlacementPage({
      success: (res) => {
        const data = res.data.data;
        setOrganization(data.mostHiringOrganisations);
        setRoles(data.mostHiringRoles);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  }, []);

  const navigation = useNavigate();

  const handleClickOrganisation = (tag) => {
    return navigation(`/placement/organisationView/${tag}`);
  };
  const handleClickJobRole = (jobId, jobRole) => {
    return navigation(`/placement/jobRoleView/${jobId}/${jobRole}`);
  };
  return (
    <div className="tw-w-auto tw-mt-10 pb-2 tw-h-auto tw-flex ">
      {/* Most hiring organization */}
      <div className=" tw-flex-1">
        <h4 className="tw-font-bold tw-text-[18px] tw-capitalize">
          Most Hiring Organization
        </h4>
        {/* list */}
        <div className="tw-w-[90%] tw-mt-3 tw-h-auto tw-max-h-[550px] tw-overflow-y-scroll tw-overflow-hidden tw-divide-y-2 border_light">
          {organization.map((li, i) => (
            <div
              className="tw-flex tw-gap-4 tw-p-4 tw-justify-start tw-items-center"
              key={i}
            >
              <img
                className="tw-rounded-full tw-w-10 tw-h-10 tw-bg-gray-300"
                src={li.logo}
                alt=""
              />
              <div
                onClick={() => handleClickOrganisation(li?.companyName)}
                className="tw-cursor-pointer tw-flex tw-flex-col tw--mb-4 tw-items-start tw-justify-center"
              >
                <h5 className="tw-font-bold tw-text-black tw-text-[18px]">
                  {li.companyName}
                </h5>
                <p className="tw-text-[#9A9A9A] tw-mb-3  tw-text-sm">
                  {`${li.totalHired} Students placed | Since ${
                    li.oldestPostedOn.split("T")[0].split("-")[0]
                  }`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Most hiring Roles */}
      <div className="tw-flex-1">
        <h4 className="tw-font-bold tw-text-[18px] tw-capitalize">
          Most Hiring Roles
        </h4>
        {/* list */}
        <div className="tw-border-2 tw-w-[90%] tw-mt-3 tw-h-auto tw-max-h-[550px] tw-overflow-y-scroll tw-overflow-hidden tw-divide-y-2 tw-rounded-xl tw-border-[rgba(0, 0, 0, 0.3)]">
          {roles.map((li, i) => (
            <div
              className="tw-flex tw-flex-col tw--mb-4 tw-cursor-pointer tw-p-4  tw-justify-center tw-items-start"
              key={i}
              onClick={() => handleClickJobRole(li.jobId, li.role)}
            >
              <h5 className="tw-font-bold tw-text-black tw-text-[18px]">
                {li.role}{" "}
                <span
                  // onClick={() => handleClickOrganisation(li.title)}
                  className="gradiant-color"
                >
                  {`@ ${li.companyName}`}
                </span>
              </h5>
              <p className="tw-text-[#9A9A9A] tw-mb-3 tw-text-sm">{`${li.appliedCount} Students applied | ${li.hiredCount} Placed`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementHomePage;
