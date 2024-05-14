import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../components/Modal/ModalComponent";

import institutionApi from "../../../apis/institution.api";

const AdminDepartments = () => {
  const [departments, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const navigate = useNavigate();

  const [departmentData, setDepartmentData] = useState({
    name: "",
    programType: "",
    programDuration: "",
  });

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };
  const handleCloseModal = () => {
    setSelectedDepartment(null);
  };

  useEffect(() => {
    institutionApi.getInstitutionDepartment({
      success: (res) => {
        setDepartment(res.data.data);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  }, []);

  const UpdateDepartment = (departmentId) => {
    institutionApi.UpdateDepartment({
      departmentId,
      payload: selectedDepartment,
      success: (res) => {
        navigate(`/students/department/${res.data.profile.departmentId}`);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  };
  return (
    <div className="d-flex flex-column">
      <section className="d-flex align-items-center justify-content-between">
        <h5 style={{ fontSize: "19px", fontWeight: "700" }}>Departments</h5>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#dropdown2"
          className="tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-font-medium"
          style={{
            backgroundColor:
              "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",

            background:
              "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
          }}
        >
          Add Department Users <span className="tw-text-xl">+</span>
        </button>
        {/* Model */}
        <ModalComponent
          title={selectedDepartment ? `Update Department` : `Add Department`}
          btnTitle={selectedDepartment ? "Save & Update" : `Save & Add`}
          onSave={
            selectedDepartment
              ? () => UpdateDepartment(selectedDepartment.departmentId)
              : null
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
            class="form-control"
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
                <option value="Professional Program">
                  Professional Program
                </option>
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
      </section>
      {/* list departments */}
      <ul className="tw-my-6">
        {departments?.map((li, i) => (
          <li
            className="d-flex tw-p-4 border tw-my-4 tw-rounded-xl tw-justify-between tw-items-center"
            onClick={() => handleDepartmentClick(li)}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <div className="left">
              <h3 className="tw-text-lg tw-font-semibold">{li.name}</h3>
              <p className="tw-text-[#8F8F8F] tw-text-base">{`${li.programType} | ${li.programDuration}`}</p>
            </div>
            <div className="right">
              <div className="d-flex tw-gap-1 tw-p-0 tw-leading-6 tw-text-[22px] tw-justify-center tw-items-center tw-font-extrabold gradiant-color">
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.57143 6C7.22871 6 8.57143 4.65729 8.57143 3C8.57143 1.34271 7.22871 0 5.57143 0C3.91414 0 2.57143 1.34271 2.57143 3C2.57143 4.65729 3.91414 6 5.57143 6ZM15 4.5C15 5.80243 13.9453 6.85714 12.6429 6.85714C12.3333 6.8572 12.0268 6.79627 11.7408 6.67783C11.4547 6.55939 11.1949 6.38577 10.976 6.16688C10.7571 5.94798 10.5835 5.68811 10.465 5.40211C10.3466 5.1161 10.2857 4.80956 10.2857 4.5C10.2857 3.19757 11.3404 2.14286 12.6429 2.14286C13.9453 2.14286 15 3.19757 15 4.5ZM5.57143 6.85714C6.74314 6.85714 8.64986 7.22186 9.90043 7.94786C10.4113 8.46771 10.7143 9.03471 10.7143 9.6V12H0V9.6C0 7.776 3.71186 6.85714 5.57143 6.85714ZM17.1429 12H11.5714V9.6C11.5714 8.99314 11.3524 8.43429 11.004 7.93586C11.6644 7.78843 12.3146 7.71429 12.8113 7.71429C14.4086 7.71429 17.1429 8.48014 17.1429 9.99986V12Z"
                    fill="url(#paint0_linear_330_948)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_330_948"
                      x1="8.42288"
                      y1="-0.0658714"
                      x2="8.42288"
                      y2="14.5242"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#EB7C49" />
                      <stop offset="1" stop-color="#F04F52" />
                    </linearGradient>
                  </defs>
                </svg>
                {li.totalStudents}
              </div>
              <p className="tw-text-[17] tw-font-semibold">Students</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDepartments;
