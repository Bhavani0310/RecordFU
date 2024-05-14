import axios from "../configs/axios-instances";

import apiPath from "../constants/api-path.constant";

const institutionApi = {
  getInstitutionProfile: ({ query, success, error }) => {
    const {
      institution: { getInstitutionProfile },
    } = apiPath;
    axios.getRequest({ path: getInstitutionProfile, success, error });
  },
  getInstitutionDepartment: ({ query, success, error }) => {
    const {
      institution: { getInstitutionDepartment },
    } = apiPath;
    axios.getRequest({ path: getInstitutionDepartment, success, error });
  },
  postInstitutionDepartment: ({ payload, success, error }) => {
    const {
      institution: { postInstitutionDepartment },
    } = apiPath;
    axios.postRequest({
      path: postInstitutionDepartment,
      payload,
      success,
      error,
    });
  },
  putInstitutionProfile: ({ payload, success, error }) => {
    const {
      institution: { UpdateInstitutionProfile },
    } = apiPath;
    axios.putRequest({
      path: UpdateInstitutionProfile,
      payload,
      success,
      error,
    });
  },
  UpdateDepartment: ({ departmentId, payload, success, error }) => {
    const {
      institution: { putInstitutionDepartment },
    } = apiPath;
    const pathWithParams = `${putInstitutionDepartment}/${departmentId}`;
    axios.putRequest({ path: pathWithParams, payload, success, error });
  },
};

export default institutionApi;
