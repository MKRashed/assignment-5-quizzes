import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home(){

    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const handleLogout = () => {
        signOut(auth).then( () => {
            navigate('/login')
        }).catch( (error) => {
            console.error(error);
        });
    }

    if(loading) return <p>Loading...</p>;
    

    return (
        <>
            <div className="text-xl">
                Welcome, {user.email}!
            </div>
            <button 
                className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors" onClick={handleLogout}>
            Logout
            </button>
        </>
    );
}