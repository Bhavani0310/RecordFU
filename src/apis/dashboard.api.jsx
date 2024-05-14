import axios from "../configs/axios-instances";

import apiPath from "../constants/api-path.constant";

const dashboardApi = {
  getAdminDashboard: ({ query, success, error }) => {
    const {
      dashboard: { getAdminDashboard },
    } = apiPath;
    axios.getRequest({ path: getAdminDashboard, success, error });
  },
  getStaffDashboard: ({ query, success, error }) => {
    const {
      dashboard: { getStaffDashboard },
    } = apiPath;
    axios.getRequest({ path: getStaffDashboard, success, error });
  },
  updateProfile: ({ staffId, payload, success, error }) => {
    const {
      dashboard: { updateProfile },
    } = apiPath;
    const pathWithParams = `${updateProfile}/${staffId}`;
    axios.putRequest({ path: pathWithParams, payload, success, error });
  },
  getInstitutionUsers: ({ query, success, error }) => {
    const {
      dashboard: { getInstitutionUsers },
    } = apiPath;
    axios.getRequest({ path: getInstitutionUsers, success, error });
  },
  postAddInstitutionUsers: ({ payload, success, error }) => {
    const {
      dashboard: { postAddInstitutionUsers },
    } = apiPath;
    const pathWithParams = `${postAddInstitutionUsers}`;
    axios.postRequest({ path: pathWithParams, payload, success, error });
  },
  updateStaff: ({ staffId, payload, success, error }) => {
    const {
      dashboard: { UpdateInstitutionUsers },
    } = apiPath;
    const pathWithParams = `${UpdateInstitutionUsers}/${staffId}`;
    axios.putRequest({ path: pathWithParams, payload, success, error });
  },
};

export default dashboardApi;
