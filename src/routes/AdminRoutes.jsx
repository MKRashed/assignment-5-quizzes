import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SideNav from '../admin/SideNav'

const AdminRoutes = () => {
    const { auth } = useAuth();
    console.log('admin', auth);
    

    return (
        <>
         { auth?.user?.role === 'admin' ? (
            <div className="bg-gray-100 min-h-screen flex">
                <SideNav/>
                <Outlet /> 
            </div>
            ): (<Navigate to="/login" />) }
        </>
    )
}

export default AdminRoutes;