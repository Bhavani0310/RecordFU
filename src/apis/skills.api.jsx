// Importing constants
import axiosInstances from "../configs/axios-instances";
import apiPathConstants from "../constants/api-path.constant";

const skillApi = {
  getSkills: ({ query, success, error }) => {
    const {
      skill: { getSkills },
    } = apiPathConstants;
    axiosInstances.getRequest({
      path: getSkills,
      params: { q: query },
      success,
      error,
    });
  },
};

export default skillApi;
