import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";

const AdminRoutes = () => {
    const [user, loading, error] = useAuthState(auth);
    
    if(loading) return <p>Loading user data...</p>;

    if(error) return <p>Error: {error.message}</p>;

    return (
        <>
         { user ? <Outlet/>: <Navigate to="/login" />}
        </>
    )
}

export default AdminRoutes;