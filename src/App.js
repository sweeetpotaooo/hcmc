import React, { useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Main from "./views/Main";
import HomeView from "./views/HomeView";
import PlannedView from "./views/PlannedView";
import Login from "./views/Login";
import Plan from "./views/Plan";
import SignUp from "./components/SignUp";
import PlandetailFree from "./views/Plandetail_free";
import PlandetailPremeditate from "./views/Plandetail_premeditate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import MyPlan from "./components/MyPlan";
import { authUser } from "./redux/thunkFunctions";
import ProtectedRoutes from "./appointment/ProtectedRoutes";
import NotAuthRoutes from "./appointment/NotAuthRoutes";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Outlet />
    </div>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();
  const { planId } = useParams();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [dispatch, pathname, isAuth, planId]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />

        {/* 로그인 한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/plan" element={<Plan />} />

          <Route path="/free" element={<HomeView />} />
          <Route path="/free/:planId" element={<HomeView />} />

          <Route path="/planned" element={<PlannedView />} />
          <Route path="/planned/:planId" element={<PlannedView />} />

          <Route path="/plandetail_free" element={<PlandetailFree />} />
          <Route
            path="/Plandetail_premeditate"
            element={<PlandetailPremeditate />}
          />
          <Route path="/myplan" element={<MyPlan />} />
        </Route>

        {/* 로그인 한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
