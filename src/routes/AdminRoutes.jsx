import { Navigate, Outlet } from "react-router-dom";
import SideNav from "../admin/SideNav";
import { useAuth } from "../hooks/useAuth";

const AdminRoutes = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth?.user?.role === "admin" ? (
        <div className="bg-gray-100 min-h-screen flex">
          <SideNav />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default AdminRoutes;
