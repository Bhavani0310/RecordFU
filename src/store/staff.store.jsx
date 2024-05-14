import { atom } from "recoil";

const staff = atom({
  key: "staff",
  default: {
    isLoggedIn: false,
    staffId: "",
    name: "",
    departmentId: "",
    designation: "",
    profilePicture: "",
    username: "",
    email: "",
    isActive: false,
  },
});

export default staff;
