import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../components/Modal/ModalComponent";
import institutionApi from "../../apis/institution.api";

const AddDepartment = () => {
  const [departments, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const navigate = useNavigate();

  const [departmentData, setDepartmentData] = useState({
    name: "",
    programType: "",
    programDuration: "",
  });

  const handleCloseModal = () => {
    setSelectedDepartment(null);
  };

  const isFormEmpty = () => {
    return Object.values(departmentData).some((value) => {
      if (typeof value === "string") {
        return value.trim() === "";
      }
      return value === undefined || value === null; // Check for undefined or null for non-string values
    });
  };
  const handleAddDepartment = () => {
    if (
      departmentData.name &&
      departmentData.programType &&
      departmentData.programDuration
    ) {
      institutionApi.postInstitutionDepartment({
        payload: departmentData,
        success: (res) => {
          navigate(`/students/department/${res.data.data.departmentId}`);
        },
        error: (err) => {
          alert("Error Occurred Try After Some Time");
        },
      });
    } else {
      alert("Please fill in all required fields.");
    }
    setDepartmentData({
      name: "",
      programType: "",
      programDuration: "",
    });
  };
  return (
    <>
      <ModalComponent
        title={selectedDepartment ? `Update Department` : `Add Department`}
        btnTitle={selectedDepartment ? "Save & Update" : `Save & Add`}
        target="dropdown2"
        btn={
          <button
            type="submit"
            className="tw-text-white tw-text-base tw-ml-auto tw-float-right tw-text-center tw-px-4 tw-py-2 tw-rounded-md tw-font-medium"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{
              backgroundColor: isFormEmpty()
                ? "#cccccc"
                : "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
              background: isFormEmpty()
                ? "#cccccc"
                : "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
            }}
            disabled={isFormEmpty()}
            onClick={() => {
              if (!isFormEmpty()) {
                handleAddDepartment();
              }
            }}
          >
            Save & Add
          </button>
        }
        department={selectedDepartment}
        onClose={handleCloseModal}
      >
        <label
          htmlFor="name"
          className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
        >
          Department Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Ex: Department of Electronics Engineering"
          style={{
            backgroundColor: "rgba(243, 243, 243, 1)",
            borderRadius: "7px",
          }}
          value={
            departmentData.name ||
            (selectedDepartment ? selectedDepartment.name : "")
          }
          onChange={(e) =>
            selectedDepartment
              ? setSelectedDepartment({
                  ...selectedDepartment,
                  name: e.target.value,
                })
              : setDepartmentData({ ...departmentData, name: e.target.value })
          }
        />
        <div className="d-flex tw-my-4 tw-justify-between tw-items-center">
          <div className="">
            <label
              htmlFor="ProgramType"
              className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
            >
              Program Type
            </label>
            <select
              name="ProgramType"
              id="ProgramType"
              className="tw-bg-[#F3F3F3] tw-border tw-border-gray-300 tw-text-black tw-text-md tw-rounded-lg tw-focus:ring-blue-500 
            tw-focus:border-blue-500 tw-block tw-p-2.5 tw-w-[200px] tw-pr-3 tw-font-medium"
              value={
                departmentData.programType ||
                (selectedDepartment ? selectedDepartment.programType : "")
              }
              onChange={(e) =>
                selectedDepartment
                  ? setSelectedDepartment({
                      ...selectedDepartment,
                      programType: e.target.value,
                    })
                  : setDepartmentData({
                      ...departmentData,
                      programType: e.target.value,
                    })
              }
            >
              <option value="" disabled>
                Select Program Type
              </option>
              <option value="Degree Program">Degree Program</option>
              <option value="Integrated Program">Integrated Program</option>
              <option value="Certificate Program">Certificate Program</option>
              <option value="Diploma Program">Diploma Program</option>
              <option value="Professional Program">Professional Program</option>
            </select>
          </div>
          <div className="">
            <label
              htmlFor="programDuration"
              className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
            >
              Program Duration
            </label>
            <select
              name="programDuration"
              id="programDuration"
              className="tw-bg-[#F3F3F3] tw-border tw-border-gray-300 tw-text-black tw-text-md tw-rounded-lg tw-focus:ring-blue-500 
            tw-focus:border-blue-500 tw-block tw-p-2.5 tw-w-[200px] tw-pr-3 tw-font-medium"
              value={
                departmentData.programDuration ||
                (selectedDepartment ? selectedDepartment.programDuration : "")
              }
              onChange={(e) =>
                selectedDepartment
                  ? setSelectedDepartment({
                      ...selectedDepartment,
                      programDuration: e.target.value,
                    })
                  : setDepartmentData({
                      ...departmentData,
                      programDuration: e.target.value,
                    })
              }
            >
              <option value="" disabled>
                Select Program Duration
              </option>
              <option value="6 Months">6 months</option>
              <option value="1 Year">1 year</option>
              <option value="2 Years">2 years</option>
              <option value="3 Years">3 years</option>
              <option value="4 Years">4 years</option>
            </select>
          </div>
        </div>
      </ModalComponent>
    </>
  );
};

export default AddDepartment;
