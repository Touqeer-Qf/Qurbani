import { Navigate } from "react-router-dom";
import Login from "../auth/Login";
import Home from "../view/Home";
import Report from "../view/Report";
import { PageNotFound } from "../view/NotFound";
import EditRecord from "../view/EditRecord";

const PrivateRoutes = [
  {
    path: '/',
    component: <Home />
  },
  {
    path: '/report',
    component: <Report />
  },
  {
    path: "/edit-record",
    component: <EditRecord/>,
  },
  {
    path: "*",
    component: <Navigate to="/404" />
  },
  {
    path: "/404",
    component: <PageNotFound />,
  },
];

export default PrivateRoutes;