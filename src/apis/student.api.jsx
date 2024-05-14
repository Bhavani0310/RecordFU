import axios from "../configs/axios-instances";

import apiPath from "../constants/api-path.constant";

const studentApi = {
  getBestStudents: ({ query, success, error }) => {
    const {
      student: { getBestStudents },
    } = apiPath;
    axios.getRequest({ path: getBestStudents, success, error });
  },
  getStudentProfile: ({ studentId, success, error }) => {
    const {
      student: { getStudentProfile },
    } = apiPath;
    const pathWithParams = `${getStudentProfile}/${studentId}`;

    axios.getRequest({ path: pathWithParams, success, error });
  },
  getDepartProfile: ({ departmentId, success, error }) => {
    const {
      student: { getDepartmentProfile },
    } = apiPath;
    const pathWithParams = `${getDepartmentProfile}/${departmentId}`;

    axios.getRequest({ path: pathWithParams, success, error });
  },
  getStaffDepartProfile: ({ query, success, error }) => {
    const {
      student: { getDepartmentProfile },
    } = apiPath;
    const pathWithParams = `${getDepartmentProfile}`;

    axios.getRequest({ path: pathWithParams, success, error });
  },
};

export default studentApi;
