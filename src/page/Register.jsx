import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoWhite from '../assets/logo-white.svg';
import Logo from "../assets/logo.svg";
import Saly from "../assets/Saly-1.png";


export default function Register(){
    
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    
    const [role, setRole] = useState('');
    
    const handleCheckboxChange = (e) => {
        setRole(e.target.checked ? 'admin' : '');
    };

    const handleSubmit =  async(event) => {
        
        event.preventDefault();

        // Reset error
        setError('');

        // Validate password match
        if (password !== confirm_password) {
            setError('Passwords do not match');
            return;
        }

        const formData = {
            full_name: name,
            email: email,
            password: password,
            role: role,
        };

        try{
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, formData);
            if (response.status === 201) {
                navigate("/login");
            }
          } catch(error){
            console.error(error);
        }
    }

    return (
        <div className="flex min-h-screen max-h-screen">
            <div className="hidden  lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12  h-full fixed left-0 top-0">
            <div className="text-white">
                <img src={LogoWhite} className="h-8" />

                <img src={Saly} alt="Illustration" className="mx-auto 2xl:ml-0 max-h-64  max-w-lg" />

                <h2 className="text-3xl font-bold mb-1">Sign Up Now</h2>
                <p className="text-xl mb-4 font-medium">Boost Your Learning Capabilities</p>
                <p className="mb-8 max-w-lg">
                Logging in unlocks your personal progress tracker, letting you evaluate your performance and see how you
                stack up against others. Whether you're preparing for exams, improving your knowledge, or simply having fun,
                there's no better way to sharpen your mind.
                </p>
            </div>


            </div>
            <div
            className="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
            <div className="w-full max-w-lg ">
                <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
                <span>Welcome to</span>
                <img src={Logo} className="h-7" />
                </h2>
                <h1 className="text-4xl font-bold mb-6">Sign Up</h1>



                <form className="">
                    <div className="">
                        <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">Full Name</label>
                        <input 
                            type="text" 
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            placeholder="John Doe" />
                        </div>

                        <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            placeholder="Email address" />
                        </div>
                    </div>

                    <div className="flex  gap-4">
                        <div className="mb-6">
                        <label htmlFor="password" className="block mb-2">Enter your Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            placeholder="Password" />
                        </div>

                        <div className="mb-6">
                        <label htmlFor="password" className="block mb-2">Confirm Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            placeholder="Confirm Password" />
                        </div>
                    </div>

                    {error && (
                            <p className="text-red-500 text-sm mb-4">{error}</p>
                        )}

                    <div className="mb-6 flex gap-2 items-center">
                        <input
                            type="checkbox"
                            id="admin"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={handleCheckboxChange}
                            className="px-4 py-3 rounded-lg border border-gray-300"
                        />
                        <label htmlFor="admin" className="block ">Register as Admin</label>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-primary text-white py-3 rounded-lg mb-2"
                        onClick={handleSubmit}>Create Account</button>
                </form>

                <div className="mt-2 text-gray-400">
                <p className="text-center">Already have account ? 
                    <NavLink to="/login" className="text-primary">Sign In</NavLink>
                </p>
                </div>
            </div>
            </div>
        </div>
    );
}