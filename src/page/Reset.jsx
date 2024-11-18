import { useState } from "react";
import { sendPasswordReset } from "../firebase";
import { useNavigate, NavLink } from "react-router-dom";

export default function Reset(){
    const [email, setEmail] = useState('');
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-center text-xl font-semibold p-2">Reset Password</h1>
            <div className="">
                <input 
                    type="email" 
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-4 py-3 mb-3 mt-3 rounded-lg border border-gray-300"
                    placeholder="Enter your email"/>
                <button className="w-full bg-primary text-white py-3 rounded-lg mb-2" onClick={() => sendPasswordReset(email)}>Send Password</button>
            </div>
            <p>
                Don't you have an account ? 
                <NavLink to="/register" className="ml-2">Register Now</NavLink>
            </p>
        </div>
    );
}