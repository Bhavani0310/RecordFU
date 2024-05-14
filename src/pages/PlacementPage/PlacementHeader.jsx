import React, { useState, useEffect } from "react";
import ModalComponent from "../../components/Modal/ModalComponent";
import institutionApi from "../../apis/institution.api";
import placementApi from "../../apis/placement.api";

import Addskills from "./Addskills";
import currentUserState from "../../store/staff.store";
import { useRecoilState } from "recoil";
import JobRole from "./JobRole";
import AddDepartment from "./AddDepartment";

const PlacementHeader = () => {
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);
  const [admin, setAdmin] = useState([false]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [departments, setDepartment] = useState([]);
  const [userInput, setUserInput] = useState({
    skills: {},
  });
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

  const handleSubmit = () => {};
  useEffect(() => {
    if (currentLoggedInUser && currentLoggedInUser.role) {
      setAdmin(currentLoggedInUser.role === "Administrator");
    }
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
    <header className="tw-w-full ">
      <div className=" tw-justify-center tw-items-center">
        <h3 className="tw-font-bold   tw-text-[25px] tw-text-center">
          Search Organizations
        </h3>
        {admin ? (
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#dropdown1"
            className="tw-text-white tw-text-base tw-ml-auto tw-float-right tw-text-center tw-px-4 tw-py-2 tw-rounded-md tw-font-medium"
            style={{
              backgroundColor:
                "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",

              background:
                "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
            }}
          >
            Create Job Post <span className="tw-text-xl">+</span>
          </button>
        ) : null}
        <JobRole />
      </div>
      {/* options  */}
      <div className="tw-flex tw-justify-center tw-items-center tw-mt-4 tw-gap-8">
        <select
          name="Industry"
          id="Industry"
          className="tw-bg-[#F3F3F3] tw-border tw-border-gray-300 tw-text-[#858585] tw-text-md tw-rounded-lg tw-focus:ring-blue-500 
          tw-focus:border-blue-500 tw-block tw-p-2.5 tw-w-[200px] tw-pr-3 tw-font-medium"
        >
          <option className="" selected>
            Industry
          </option>
          <option value="option 1">option 1</option>
          <option value="option 2">option 2</option>
          <option value="option 3">option 3</option>
          <option value="option 4">option 4</option>
          <option value="option 5">option 5</option>
        </select>

        <select
          name="Organisation"
          id="Organisation"
          className="tw-bg-[#F3F3F3] tw-border tw-border-gray-300 tw-text-[#858585] tw-text-md tw-rounded-lg tw-focus:ring-blue-500 
          tw-focus:border-blue-500 tw-block tw-p-2.5 tw-w-[250px] tw-pr-3 tw-font-medium"
        >
          <option className="" selected>
            Select Organization
          </option>
          <option value="option 1">option 1</option>
          <option value="option 2">option 2</option>
          <option value="option 3">option 3</option>
          <option value="option 4">option 4</option>
          <option value="option 5">option 5</option>
        </select>

        <select
          name="Role"
          id="Role"
          className="tw-bg-[#F3F3F3] tw-border tw-border-gray-300 tw-text-[#858585] tw-text-md tw-rounded-lg tw-focus:ring-blue-500 
          tw-focus:border-blue-500 tw-block tw-p-2.5 tw-w-[200px] tw-pr-3 tw-font-medium"
        >
          <option className="" selected>
            Select Role
          </option>
          <option value="option 1">option 1</option>
          <option value="option 2">option 2</option>
          <option value="option 3">option 3</option>
          <option value="option 4">option 4</option>
          <option value="option 5">option 5</option>
        </select>
      </div>
    </header>
  );
};

export default PlacementHeader;
