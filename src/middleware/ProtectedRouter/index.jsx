import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

import currentUserState from "../../store/staff.store";

import authApi from "../../apis/auth.api";
import Loader from "../../components/Loader/Loader";

export default function ProtectedRouter() {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);

  const checkUserSession = () => {
    authApi.verifySession({
      success: ({ data }) => {
        const userData = {
          isLoggedIn: true,
          staffId: data.data.staffId,
          name: data.data.fullName,
          email: data.data.email,
          mobile: data.data.mobile,
          institutionId: data.data.institutionId,
          role: data.data.role,
          designation: data.data.designation,
          departmentId: data.data.departmentId,
        };

        setCurrentLoggedInUser(userData);
      },
      error: () => {
        navigate("/");
      },
      final: () => {
        setIsLoaded(true);
      },
    });
  };

  useEffect(() => {
    checkUserSession();
  }, [navigate]);

  return (
    <>
      {isLoaded ? (
        currentLoggedInUser.isLoggedIn ? (
          <Outlet />
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Loader />
      )}
    </>
  );
}
