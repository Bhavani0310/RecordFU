const BASEURL = import.meta.env.VITE_BACKEND_URL;
// const BASEURL = "https://api-v2.getrecord.in/api";

const setBaseUrlPrefix = (path) => {
  return BASEURL.concat(path);
};

const apiPathConstants = {
  auth: {
    login: setBaseUrlPrefix("/auth/staff/login"),
    logout: setBaseUrlPrefix("/auth/staff/logout"),
    register: setBaseUrlPrefix("/auth/staff/register"),
    googleSSO: setBaseUrlPrefix("/auth/google-sso"),
    verifySession: setBaseUrlPrefix("/auth/staff/verify-session"),
    changePassword: setBaseUrlPrefix("/auth/staff/reset-password"),
    forgotPassword: setBaseUrlPrefix("/auth/staff/forgot-password"),
    verificationEmail: setBaseUrlPrefix("/auth/send/verification-email"),
    addStudent: setBaseUrlPrefix("/auth/staff/student"),
  },
  student: {
    getBestStudents: setBaseUrlPrefix("/students"),
    getStudentProfile: setBaseUrlPrefix("/students/profile"),
    getDepartmentProfile: setBaseUrlPrefix("/students/department"),
  },
  placement: {
    getHomePlacementPage: setBaseUrlPrefix("/placement/home"),
    getOrganizationView: setBaseUrlPrefix("/placement/organisation"),
    getJobRole: setBaseUrlPrefix("/placement/job"),
    postJobRole: setBaseUrlPrefix("/placement/job"),
  },
  skill: {
    getSkills: setBaseUrlPrefix("/skill"),
  },
  dashboard: {
    getAdminDashboard: setBaseUrlPrefix("/dashboard/admin"),
    getStaffDashboard: setBaseUrlPrefix("/dashboard/staff"),
    updateProfile: setBaseUrlPrefix("/dashboard/profile"),
    getInstitutionUsers: setBaseUrlPrefix("/dashboard/institution/users"),
    postAddInstitutionUsers: setBaseUrlPrefix("/auth/staff/register"),
    UpdateInstitutionUsers: setBaseUrlPrefix("/auth/staff"),
  },
  institution: {
    getInstitutionProfile: setBaseUrlPrefix("/institution/profile"),
    getInstitutionDepartment: setBaseUrlPrefix("/institution/departments"),
    postInstitutionDepartment: setBaseUrlPrefix("/institution/department"),
    putInstitutionDepartment: setBaseUrlPrefix("/institution/department"),
    UpdateInstitutionProfile: setBaseUrlPrefix("/institution/profile"),
  },
};

export default apiPathConstants;
