import { Navigate } from "react-router-dom";
import Login from "../auth/Login";
import Home from "../view/Home";
import Report from "../view/Report";
import { PageNotFound } from "../view/NotFound";



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
    path: "*",
    component: <Navigate to="/404" />
  },
  {
    path: "/404",
    component: <PageNotFound />,
  },
];

export default PrivateRoutes;