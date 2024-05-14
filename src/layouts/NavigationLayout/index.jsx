import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styles from "./index.module.css";
import navigationConstants from "../../constants/navigation.constant";
import settingsicon from "../../assets/svg/settings.svg";
import help from "../../assets/svg/help.svg";
import navbarLogo from "../../assets/svg/navbarLogo.svg";
import notificationImage from "../../assets/svg/notifications.svg";
import notificationIcon from "../../assets/svg/notificationIcon.svg";
import plusIcon from "../../assets/svg/plusIcon.svg";
import feedIcon from "../../assets/svg/feedBtn.svg";
import mySettings from "../../assets/svg/settings/mySettings.svg";
import myNotifications from "../../assets/svg/settings/myNotification.svg";
import activeMyNotification from "../../assets/svg/settings/activeMyNotification.svg";
import activeMySettings from "../../assets/svg/settings/activeMySetting.svg";
import integrations from "../../assets/svg/settings/integrations.svg";
import activeIntegrations from "../../assets/svg/settings/activeIntegrations.svg";
import logout from "../../assets/svg/settings/logout.svg";
import activeLogout from "../../assets/svg/settings/activelogout.svg";
import { HiMiniXMark } from "react-icons/hi2";
import currentUserState from "../../store/staff.store";
import institutionApi from "../../apis/institution.api";
import authApi from "../../apis/auth.api";
import AddDepartment from "../../pages/PlacementPage/AddDepartment";
import JobRole from "../../pages/PlacementPage/JobRole";
const settingsPanelTitle = [
  {
    title: "My Settings",
    status: true,
    icon: mySettings,
    activeIcon: activeMySettings,
  },
  {
    title: "My Notifications",
    status: false,
    icon: myNotifications,
    activeIcon: activeMyNotification,
  },
  {
    title: "Integrations",
    status: false,
    icon: integrations,
    activeIcon: activeIntegrations,
  },
  {
    title: "Logout",
    status: false,
    icon: logout,
    activeIcon: activeLogout,
  },
];
const settingsContent = {
  "My Settings": MySettingsComponent,
  "My Notifications": MyNotificationsComponent,
  Integrations: IntegrationsComponent,
  Logout: LogoutComponent,
};

const NavigationLayout = () => {
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);
  const [NavigationConstants, setNavigationConstants] =
    useState(navigationConstants);

  const [selectedSetting, setSelectedSetting] = useState(
    settingsPanelTitle[0].title
  );
  const [settings, setSettings] = useState(settingsPanelTitle);

  const handleSettingClick = (title, index) => {
    const updatedSettings = settings.map((setting, i) => {
      if (i === index) {
        return { ...setting, status: true };
      } else {
        return { ...setting, status: false };
      }
    });
    setSettings(updatedSettings);
    setSelectedSetting(title);
  };

  const SelectedSettingComponent = settingsContent[selectedSetting];
  const path = useLocation();

  useEffect(() => {
    if (currentLoggedInUser.role === "Staff") {
      setNavigationConstants((prev) => {
        return prev.map((item) => {
          if (item.name === "Students") {
            return { ...item, path: "/students/department" }; // Change path
          }
          return item;
        });
      });
    } else {
      setNavigationConstants((prev) => {
        return prev.map((item) => {
          if (item.name === "Students") {
            return { ...item, path: "/students/search" };
          }
          return item;
        });
      });
    }
  }, [currentLoggedInUser.role]);

  return (
    <div className="d-flex min-vh-100">
      <nav
        className="d-flex flex-column justify-content-between align-items-baseline p-1 border-end"
        style={{
          background: "rgba(251, 251, 251, 1)",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          width: "20vw",
        }}
      >
        <section className="tw-px-6 tw-w-full">
          <ul
            className="d-flex flex-column gap-1"
            style={{ color: "rgba(143, 143, 143, 1)" }}
          >
            <img
              src={navbarLogo}
              alt="logo"
              className="mb-3 mt-4"
              width={135}
            />
            {NavigationConstants.map((item, index) => (
              <li
                className={`d-flex fw-bold  p-2 gap-3 rounded ${
                  path.pathname === item.path ? styles.activeLink : ""
                }`}
                key={index}
              >
                <img
                  src={
                    path.pathname === item.path ? item.activeIcon : item.icon
                  }
                  alt={item.name}
                  style={{ width: "1vw" }}
                />
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="tw-px-6 tw-w-full">
          <ul className="d-flex flex-column gap-3 ">
            <li className="d-flex gap-3 fw-medium">
              <img src={help} alt="help" style={{ width: "1vw" }} />
              <a href="/register">Help</a>
            </li>
            <button
              data-bs-toggle="modal"
              type="button"
              data-bs-target="#settings"
              className="d-flex gap-3 tw-items-center fw-medium"
            >
              <img src={settingsicon} alt="settings" style={{ width: "1vw" }} />
              <span>Settings</span>
            </button>
            {/* Modal */}

            <div style={{ fontSize: "x-small" }}>
              <p>Privacy Policy | Terms</p>
              <p>@ 2023 Record Innovation and Enterprises Pvt. Ltd.</p>
            </div>
          </ul>
        </section>
      </nav>
      {/* Settings Modal */}
      <div
        className="modal fade modal-xl"
        id="settings"
        tabIndex="-1"
        aria-labelledby="settings"
        aria-hidden="true"
      >
        <div className="modal-dialog tw-h-full modal-dialog-centered ">
          <div
            className="modal-content tw-rounded-xl tw-overflow-hidden tw-bg-white"
            style={{
              width: "100%",
              height: "85%",
              borderRadius: "15px",
              padding: 0,
            }}
          >
            <div
              className="modal-body d-flex"
              style={{ width: "100%", padding: 0, margin: 0 }}
            >
              <div className="left-part tw-p-6 tw-bg-[#FBFBFB] tw-border-r tw-h-full tw-w-1/4">
                <h2
                  className="modal-title fs-5"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  Settings
                </h2>
                <ul>
                  {settings.map((setting, i) => (
                    <li
                      key={i}
                      onClick={() => handleSettingClick(setting.title, i)}
                      className={` ${
                        setting.status ? "tw-text-black" : "tw-text-[#8F8F8F]"
                      }   tw-flex tw-gap-2 tw-my-4 tw-items-center tw-font-semibold`}
                    >
                      <img
                        src={setting.status ? setting.activeIcon : setting.icon}
                        className="tw-h-[17px]"
                        alt=""
                      />
                      {setting.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="right-part tw-w-full tw-relative tw-h-full tw-p-6 tw-bg-white">
                <button
                  type="button"
                  className="btn-close d-flex tw-justify-center tw-right-1 tw-m-4 tw-absolute  tw-top-1 tw-h-6 tw-w-6 tw-items-center"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  
                >
                  <HiMiniXMark className="tw-h-6 tw-w-6" />
                </button>

                <div className="content">
                  <SelectedSettingComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --------------- */}
      <div className=" w-100 p-4">
        <TopNavbar details={currentLoggedInUser} />
        <Outlet />
      </div>
    </div>
  );
};
function TopNavbar({ details }) {
  const notification = false;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [departmentData, setDepartmentData] = useState({
    name: "",
    programType: "",
    programDuration: "",
  });

  const handleAddDepartment = () => {
    setShowModal(true);
    institutionApi.postInstitutionDepartment({
      payload: departmentData,
      success: (res) => {
        navigate(`/students/department/${res.data.data.departmentId}`);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });

    setDepartmentData({
      name: "",
      programType: "",
      programDuration: "",
    });
  };

  const dropdown = [
    ...(details.role !== "Staff"
      ? [
          {
            name: "Create Job post",
            path: "/institution",
            onClick: handleAddDepartment,
          },
        ]
      : []),
    ...(details.role !== "Staff"
      ? [
          {
            name: "Add Department",
            path: "/institution",
            onClick: handleAddDepartment,
          },
        ]
      : []),
  ];
  return (
    <section className="d-flex justify-content-between align-items-center w-100 mb-4">
      <div className="input-group mb-3 w-25">
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="d-flex justify-content-center align-items-center tw-gap-4 ">
        {details.role && details.role !== "Staff" && (
          <div className="dropdown">
            <img
              data-bs-toggle="dropdown"
              aria-expanded="false"
              src={feedIcon}
              className="tw-cursor-pointer tw-w-[25px] tw-h-[25px]"
              alt="feedIcon"
            />
            <ul className="dropdown-menu">
              {dropdown.map((item, index) => (
                <li key={index} className="tw-w-[300px]">
                  {item.onClick ? (
                    <button
                      className="dropdown-item tw-flex tw-gap-4 tw-flex-nowrap"
                      data-bs-toggle="modal"
                      data-bs-target={`#dropdown${index + 1}`}
                    >
                      <img src={plusIcon} alt="" style={{ width: "15px" }} />
                      {item.name}
                    </button>
                  ) : (
                    <a
                      className="dropdown-item tw-flex tw-gap-4 tw-flex-nowrap"
                      href={item.path}
                    >
                      <img src={plusIcon} alt="" style={{ width: "15px" }} />
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <AddDepartment />
            <JobRole />
          </div>
        )}

        <div className="dropdown">
          <img
            className="tw-cursor-pointer tw-w-[25px] tw-h-[25px]  "
            src={notificationIcon}
            alt="notification icon"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />

          <ul
            className="dropdown-menu "
            style={{
              minHeight: "50vh",
              minWidth: "15vw",
            }}
          >
            <div className="p-2">
              <h6>Notifications</h6>
            </div>
            {notification ? (
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center p-2">
                <img src={notificationImage} alt="" />
                <p className="text-center">
                  Oh! There is no notifications at the moment.
                </p>
              </div>
            )}
          </ul>
        </div>
        <a href="/profile">
          <img
            src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
            alt=""
            className="rounded-circle tw-h-[35px] tw-w-[35px]"
          />
        </a>
      </div>
    </section>
  );
}

function MySettingsComponent() {
  return <div>Content for My Settings</div>;
}

function MyNotificationsComponent() {
  const notification = false;
  return (
    <div>
      <ul>
        <div className="p-2">
          <h6>Notifications</h6>
        </div>
        {notification ? (
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center p-2">
            <img src={notificationImage} alt="" />
            <p className="text-center">
              Oh! There is no notifications at the moment.
            </p>
          </div>
        )}
      </ul>
    </div>
  );
}

function IntegrationsComponent() {
  return <div>Content for Integrations</div>;
}

function LogoutComponent() {
  authApi.handleLogout({
    success: (res) => {
      alert("SuccessFully logged Out ");
      // window.location.reload();
    },
    error: (err) => {
      alert("Error Occurred in Logout");
    },
  });

  return <>Content for Logout</>;
}
export default NavigationLayout;
