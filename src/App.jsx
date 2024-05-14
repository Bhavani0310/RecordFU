import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationLayout from "./layouts/NavigationLayout";
import navigationRoutes from "./router/auth-route";
import nonAuthRoute from "./router/non-auth-route";
import SuspenseLayout from "./layouts/SuspenseLayout";
import Signup from "./pages/SignupPage";
import ProtectedRouter from "./middleware/ProtectedRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<SuspenseLayout />}>
            <Route path="/" element={<Signup />} />

            <Route element={<ProtectedRouter />}>
              <Route element={<NavigationLayout />}>
                {navigationRoutes.map((route, index) => (
                  <Route key={index} path={route.path} element={route.element}>
                    {route.children &&
                      route.children.map((child, childIndex) => (
                        <Route
                          key={childIndex}
                          path={child.path}
                          element={child.element}
                        />
                      ))}
                  </Route>
                ))}
              </Route>
            </Route>

            {nonAuthRoute.map((route, index) => {
              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
