import React,{useState,useEffect} from "react";

import ModalComponent from "../../components/Modal/ModalComponent";
import authApi from "../../apis/auth.api"
import currentUserState from "../../store/staff.store";
import { useRecoilState } from "recoil";

const StudentHeader = () => {

  const [currentLoggedInUser, setCurrentLoggedInUser] =
  useRecoilState(currentUserState);
  const [admin,setAdmin]= useState([false]);
 
  
  useEffect(() => {
    if (currentLoggedInUser && currentLoggedInUser.role) {
      setAdmin(currentLoggedInUser.role === "Administrator");
      }
    
  }, []);
  return (
    <>
    <header className="tw-w-full">
    <div className="d-flex tw-justify-center tw-items-center">
      <h3
        className="tw-font-bold   tw-text-[25px] tw-text-center"
      >
        Search Students
      </h3>
      

        </div>
      <section
        className="d-flex w-75 gap-4"
        style={{ margin: "0 auto", alignItems: "stretch", height: "7vh" }}
      >
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder=""
          style={{
            backgroundColor: "rgba(243, 243, 243, 1)",
            borderRadius: "7px",
          }}
        />
        <DropDownComponent value="Batch" />
        <DropDownComponent value="Select Student" />
       
      
      </section>

   
    </header>
    </>
  );
};

function DropDownComponent({ value }) {
  return (
    <div className="dropdown">
      <button
        className="btn  dropdown-toggle "
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          backgroundColor: "rgba(243, 243, 243, 1)",
          color: "rgba(133, 133, 133, 1)",
          border: "none",
          height: "-webkit-fill-available",
        }}
      >
        {value ? value : "Select"}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
            Action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Another action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </li>
      </ul>
      
    </div>
  );
}
export default StudentHeader;
