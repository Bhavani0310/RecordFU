import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../components/Modal/ModalComponent";
import institutionApi from "../../apis/institution.api";
import placementApi from "../../apis/placement.api";

import Addskills from "./Addskills";

const JobRole = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [departments, setDepartment] = useState([]);
  const [userInput, setUserInput] = useState({
    skills: {},
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    jobDesignation: "",
    workplaceType: "On-Site",
    jobLocation: "",
    jobType: "Full-Time",
    openings: "",
    jobDescription: "",
    skills: {},
    departments: {},
  });
  const [data, setData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isFormEmpty = () => {
    return Object.values(formData).some((value) => {
      if (typeof value === "string") {
        return value.trim() === "";
      }
      return value === undefined || value === null; // Check for undefined or null for non-string values
    });
  };

  const handleDepartmentClick = (department) => {
    setSelectedDepartments((prevSelectedDepartments) => {
      if (prevSelectedDepartments.includes(department)) {
        return prevSelectedDepartments.filter(
          (selectedDept) => selectedDept !== department
        );
      } else {
        return [...prevSelectedDepartments, department];
      }
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      departments: [...selectedDepartments, department],
    }));
  };
  const handleJob = () => {
    placementApi.postJobRole({
      payload: formData,
      success: (res) => {
        alert("Successfully Job Added");
        window.location.reload();
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  };

  const handleSubmit = () => {
    if (isFormEmpty()) {
      alert("Please fill out all fields.");
      return;
    }
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      departments: selectedDepartments,
      skills: userInput.skills,
    }));
    setData(formData);
  }, [selectedDepartments, userInput]);

  useEffect(() => {
    institutionApi.getInstitutionDepartment({
      success: (res) => {
        const departmentNames = res.data.data.map((department) => department);
        setDepartment(departmentNames);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  }, []);
  return (
    <>
      <header className="tw-w-full ">
        {/* model for create job post */}
        <ModalComponent
          target="dropdown1"
          title="Create Job Post"
          btn={
            <button
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#AssignStudents"
              className="tw-text-white tw-text-base tw-ml-auto tw-float-right tw-text-center tw-px-4 tw-py-2 tw-rounded-md tw-font-medium"
              style={{
                backgroundColor: isFormEmpty()
                  ? "#cccccc"
                  : "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
                background: isFormEmpty()
                  ? "#cccccc"
                  : "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
              }}
              disabled={isFormEmpty()}
            >
              Assign Students
            </button>
          }
          btnTitle="Assign Students"
          onSubmit={handleSubmit}
        >
          {/* company name and job Description */}
          <div className="d-flex tw-w-full tw-mb-4 tw-justify-between tw-gap-8">
            <div className="tw-w-full">
              <label
                htmlFor="companyName"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Ex: Infosys"
                className="form-control"
                style={{
                  backgroundColor: "rgba(243, 243, 243, 1)",
                  borderRadius: "7px",
                }}
                required
              />
            </div>
            <div className="tw-w-full">
              <label
                htmlFor="jobDesignation"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                Job Designation
              </label>
              <input
                type="text"
                name="jobDesignation"
                value={formData.jobDesignation}
                onChange={handleChange}
                placeholder="Ex: Technical Support"
                className="form-control"
                style={{
                  backgroundColor: "rgba(243, 243, 243, 1)",
                  borderRadius: "7px",
                }}
                required
              />
            </div>
          </div>
          {/* Working type and job location */}
          <div className="d-flex tw-w-full tw-mb-4 tw-justify-between tw-gap-8">
            <div className="tw-w-full">
              <label
                htmlFor="workplaceType"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                Workplace Type
              </label>
              <select
                name="workplaceType"
                value={formData.workplaceType}
                onChange={handleChange}
                className="tw-bg-[#F3F3F3] tw-border tw-border-gray-300 tw-text-black tw-text-md tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-p-2.5 tw-w-full tw-pr-3 tw-font-medium"
              >
                <option value="On-Site">On-Site</option>
                <option value="Work from Office">Work from Office</option>
                <option value="Work from Home">Work from Home</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="tw-w-full">
              <label
                htmlFor="jobLocation"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                Job Location
              </label>
              <input
                type="text"
                name="jobLocation"
                value={formData.jobLocation}
                onChange={handleChange}
                placeholder="Ex: Coimbatore, Tamil Nadu, India"
                className="form-control"
                style={{
                  backgroundColor: "rgba(243, 243, 243, 1)",
                  borderRadius: "7px",
                }}
              />
            </div>
          </div>
          {/* Job type and no. of opening */}
          <div className="d-flex tw-w-full tw-mb-4 tw-justify-between tw-gap-8">
            <div className="tw-w-full">
              <label
                htmlFor="jobType"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="tw-bg-[#F3F3F3] tw-border tw-border-gray-300 tw-text-black tw-text-md tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-p-2.5 tw-w-full tw-pr-3 tw-font-medium"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="tw-w-full">
              <label
                htmlFor="numberOfOpenings"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                No. of Openings
              </label>
              <input
                type="number"
                name="openings"
                value={formData.openings}
                onChange={handleChange}
                placeholder="Enter number"
                className="form-control"
                style={{
                  backgroundColor: "rgba(243, 243, 243, 1)",
                  borderRadius: "7px",
                }}
              />
            </div>
          </div>
          {/* job description */}
          <label
            htmlFor="jobDescription"
            className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
          >
            Job Description
          </label>
          <textarea
            rows={8}
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="form-control"
            style={{
              backgroundColor: "rgba(243, 243, 243, 1)",
              borderRadius: "7px",
            }}
            placeholder="Ex: Infosys"
          ></textarea>
          {/* Skills */}
          <label
            htmlFor="skills"
            className="tw-text-[#8F8F8F] tw-font-medium tw-mt-4 tw-mb-1"
          >
            Skills
          </label>

          <Addskills setUserInput={setUserInput} userInput={userInput} />
        </ModalComponent>
        {/* Assign Students modal */}
        <ModalComponent
          target="AssignStudents"
          btnTitle="Send Notification"
          btn={
            <>
              <button
                data-bs-toggle="modal"
                data-bs-target="#AssignStudentsNotification"
                className="tw-text-white tw-text-base tw-flex tw-justify-center tw-items-center gap-2 tw-ml-auto tw-float-right tw-text-center tw-px-4 tw-py-2 tw-rounded-md tw-font-medium"
                style={{
                  backgroundColor:
                    selectedDepartments.length === 0
                      ? "#cccccc"
                      : "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
                  background:
                    selectedDepartments.length === 0
                      ? "#cccccc"
                      : "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
                }}
                disabled={selectedDepartments.length === 0}
              >
                <span>Send Notification</span>
                <span className=" tw-inline-block tw-m-1">
                  <svg
                    width="11"
                    height="10"
                    viewBox="0 0 11 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.76191 7.85714C5.76191 6.12333 7.17095 4.71429 8.90476 4.71429C9.48095 4.71429 10.0152 4.87143 10.4762 5.13857V1.04762C10.4762 0.769773 10.3658 0.503307 10.1694 0.30684C9.97288 0.110374 9.70642 0 9.42857 0H1.04762C0.46619 0 0 0.46619 0 1.04762V7.33333C0 7.61118 0.110374 7.87765 0.30684 8.07411C0.503307 8.27058 0.769773 8.38095 1.04762 8.38095H5.80905C5.78286 8.2081 5.76191 8.03524 5.76191 7.85714ZM1.04762 2.09524V1.04762L5.2381 3.66667L9.42857 1.04762V2.09524L5.2381 4.71429L1.04762 2.09524ZM9.42857 9.42857V8.38095H7.33333V7.33333H9.42857V6.28571L11 7.85714L9.42857 9.42857Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </button>
            </>
          }
          title="Assign Students"
        >
          <p className="tw-font-medium tw-mb-2">
            Assign this opportunity to the relevant department students.
          </p>
          <div className="d-flex tw-flex-wrap">
            {departments.map((it, i) => (
              <label
                key={i}
                className="tw-p-1  tw-m-1 tw-font-medium tw-rounded-xl tw-border-2 tw-border-[rgb(235,124,73)]"
                onClick={() => handleDepartmentClick(it.departmentId)}
                style={{
                  backgroundColor: selectedDepartments.includes(it.departmentId)
                    ? "#EB7C49"
                    : "transparent",
                  color: selectedDepartments.includes(it.departmentId)
                    ? "#fff"
                    : "#000",
                }}
              >
                {it.name}
              </label>
            ))}
            <button
              style={{
                backgroundColor: "rgba(243, 243, 243, 1)",
                borderRadius: "7px",
              }}
              className="tw-font-semibold tw-text-[#EB7C49] tw-border p-2 tw-m-1 tw-rounded-lg tw-bg-[#F3F3F3]"
              data-bs-toggle="modal"
              data-bs-target="#dropdown2"
            >
              Add Departments <span className="tw-text-lg">+</span>
            </button>
          </div>
        </ModalComponent>
        {/* Assign Students Notification modal */}
        <ModalComponent
          target="AssignStudentsNotification"
          btn={<span></span>}
          title="Assign Students"
        >
          <div className="tw-w-full tw-justify-center tw-flex tw-items-center tw-flex-col tw-h-full">
            <p className="tw-font-medium tw-text-lg tw-my-8">
              Notification has been send to relevant department students.{" "}
            </p>
            <button
              data-bs-dismiss="modal"
              className="tw-text-white tw-text-base tw-mb-4 tw-float-right tw-text-center tw-px-4 tw-py-2 tw-rounded-md tw-font-medium"
              style={{
                backgroundColor:
                  "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",

                background:
                  "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
              }}
              onClick={handleJob}
            >
              Done
            </button>
          </div>
        </ModalComponent>
      </header>
    </>
  );
};

export default JobRole;
