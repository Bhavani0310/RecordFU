import dashboard from "../assets/svg/dashboard/dashboardLogo.svg";
import activeDashboard from "../assets/svg/dashboard/activeDashboardLogo.svg";
import students from "../assets/svg/students/studentsLogo.svg";
import activeStudents from "../assets/svg/students/studentsActiveLogo.svg";
import placement from "../assets/svg/placement/placementLogo.svg";
import activePlacement from "../assets/svg/placement/placementActiveLogo.svg";
import activeInstitution from "../assets/svg/institution/institutionActiveLogo.svg";
import institutionLogo from "../assets/svg/institution/institutionLogo.svg";

const navigationConstants = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: dashboard,
    activeIcon: activeDashboard,
  },
  {
    name: "Students",
    path: "/students/search",
    icon: students,
    activeIcon: activeStudents,
  },
  {
    name: "Placement",
    path: "/placement/home",
    icon: placement,
    activeIcon: activePlacement,
  },
  {
    name: "Institution",
    path: "/institution",
    icon: institutionLogo,
    activeIcon: activeInstitution,
  },
];

export default navigationConstants;
