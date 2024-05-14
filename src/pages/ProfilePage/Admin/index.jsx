import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import ModalComponent from "../../../components/Modal/ModalComponent";
import penEditIcon from "../../../assets/svg/editPenIcon.svg";
import dashboardApi from "../../../apis/dashboard.api";
import institutionApi from "../../../apis/institution.api";
const AdminInstitution = () => {
  const [editUser1, setEditUser1] = useState(null); // State for first modal
  const [editUser2, setEditUser2] = useState(null); // State for second modal

  const handleEditClick1 = (details) => {
   
    setEditUser1(details);
  };

  const handleEditClick2 = (details) => {
   
    setEditUser2(details);
  };

  const handleCloseModal1 = () => {

    setEditUser1(null);
  };

  const handleCloseModal2 = () => {

    setEditUser2(null);
  };

  const handleAddUser=(data)=>{

    handleCloseModal1();
  }
  const handleUpdateUser=(data)=>{
   
    handleCloseModal2();
  }
  const [InstitutionUsers, setInstitutionUsers] = useState([]);
  useEffect(() => {
    dashboardApi.getInstitutionUsers({
      success: (res) => {
        console.log(res.data);
        setInstitutionUsers(res.data.data);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time")
      },
    });
  }, []);

  return (
    <div className="d-flex flex-column gap-3">
      <section className="d-flex justify-content-between">
        <h5 style={{ fontSize: "19px", fontWeight: "700" }}>Users ({InstitutionUsers?InstitutionUsers.length:0})</h5>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          className="tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-font-medium"
          style={{
            backgroundColor:
              "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
            background:
              "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
          }}
        >
          Add Institution Users<span className="tw-text-xl">+</span>
        </button>
        <ModalComponent
          title="Add Institution Users"
          btnTitle="Save & Add New"
          target="exampleModal1"
          profile="profile"
          onClose={handleCloseModal1}
        >
          <FormComponent  onSubmit={handleAddUser}/>
        </ModalComponent>
        <ModalComponent
          title="Update Institution User"
          btnTitle="Save & Update"
          target="exampleModal2"
          profile="profile"
          onClose={handleCloseModal2}
        >
          <FormComponent user={editUser2} onSubmit={handleUpdateUser}/>
        </ModalComponent>
      </section>

      <section>
        <SearchComponent />
      </section>

      <section
        className="border p-2 rounded-3"
        style={{ maxHeight: "65vh", overflow: "auto" }}
      >
        <TableComponent
          details={InstitutionUsers ? InstitutionUsers : null}
          onEditClick={handleEditClick2}
        />
      </section>
    </div>
  );
};

function FormComponent({user,onSubmit}) {
  const [formData, setFormData] = useState({
    fullName: user ? user.fullName : "",
    email: user ? user.email : "",
    role: user ? user.role : "",
    departmentId: user ? user.departmentId : "", // Assuming user.departmentId is used for the department
  });
  const [departments, setDepartments] = useState([]);
 const staffId=user?user.staffId:"";
 
  useEffect(() => {
    setFormData({
      fullName: user ? user.fullName : "",
      email: user ? user.email : "",
      departmentId: user ? user.departmentId: "",
      role: user ? user.role : "",
    });
  }, [user]);

  useEffect(() => {
    institutionApi.getInstitutionDepartment({
      success: (res) => {
        setDepartments(res.data.data);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time")
      },
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     // Send form data back to the parent component
    
    user?(dashboardApi.updateStaff({
     staffId,
      payload:formData,
      success:(res)=>{
        
        alert("Profile Updated Successfully")
        // window.location.reload();
      },
      error:(err)=>{
        alert("Error Occurred Try After Some Time")
      }
    })):( dashboardApi.postAddInstitutionUsers({
      payload:formData,
      success:(res)=>{
        
        alert("User Added Successfully")
        // window.location.reload();
      },error:(err)=>{
        alert("Error Occurred Try After Some Time")
      }
    }))
    setFormData({
      fullName: "",
      email: "",
      role: "",
      departmentId: "",
    });
    onSubmit(formData);
  };

  return (
    <form className={`row g-3 ${styles.formWrapper}`} onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="fullName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          name="fullName"
          defaultValue={formData.fullName}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="email" className="form-label">
          Official Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          defaultValue={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="department" className="form-label">
          Representing Department
        </label>
        <select
          className="form-select"
          id="departmentId"
          name="departmentId"
          defaultValue={formData.departmentId}
          onChange={handleChange}
        >
          <option value="" >
            Choose...
          </option>
          {departments.map((department) => (
            <option key={department.departmentId} value={department.departmentId}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select
          className="form-select"
          id="role"
          name="role"
          defaultValue={formData.role}
          onChange={handleChange}
        >
          <option value="" disabled>
            Choose...
          </option>
          <option value="Administrator">Administrator</option>
          <option value="Staff">Staff</option>
        </select>
      </div>
      <div className="col-12">
        <button
          type="submit"
          className="tw-text-white tw-text-base tw-ml-auto tw-float-right tw-text-center tw-px-4 tw-py-2 tw-rounded-md tw-font-medium"
          data-bs-dismiss="modal"
          aria-label="Close"
          style={{
            backgroundColor: "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
            background: "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
          }}
        >
          Save & Update
        </button>
      </div>
    </form>
  );
}

function TableComponent({ details, onEditClick }) {
  useEffect(()=>{

  },[details])
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        {details &&
          details.map((user, index) => {
            return (
              <tr key={index} className="tw-table-row">
                <td scope="row ">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src="/user.png"
                      alt=""
                      style={{ width: "50px", borderRadius: "50%" }}
                    />
                    <p>{user.fullName}</p>
                  </div>
                </td>
                <td className="">{user.email}</td>
                <td>{user.role}</td>
                <td className="">
                  <img
                    src={penEditIcon}
                    alt="pen-icon"
                    className="tw-cursor-pointer tw-h-[15px] tw-w-[15px]"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                    onClick={() => onEditClick(user)}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

function SearchComponent() {
  return (
    <>
      <div
        className="border p-2 rounded-3 d-flex gap-2"
        style={{ width: "25vw", backgroundColor: "rgba(243, 243, 243, 1)" }}
      >
        <i className="bi bi-search"></i>
        <input
          type="text"
          defaultValue=""
          placeholder="Search the users by name or email"
          style={{ border: "none", backgroundColor: "inherit" }}
        />
      </div>
    </>
  );
}

export default AdminInstitution;
