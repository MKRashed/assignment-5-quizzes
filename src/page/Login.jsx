import axios from 'axios';
import localforage from "localforage";
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Saly from '../assets/Saly-1.png';
import Logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth";


export default function Login(){

    const {setAuth} = useAuth();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const [role, setRole] = useState('');

    const handleCheckboxChange = (e) => {
        setRole(e.target.checked ? 'admin' : '');
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        const formData = {
            email: email,
            password: password
        }

        try{
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData);

            
            if (response.status === 200) {

                const { tokens, user } = response.data.data;

              if (tokens) {

                const authToken = tokens.accessToken;

                const refreshToken = tokens.refreshToken;

                await localforage.setItem('authToken', authToken);

                await localforage.setItem('refreshToken', refreshToken);
                
                await localforage.setItem('user', user);

                setAuth({user, authToken, refreshToken});

                if(role === 'admin'){
                    navigate('/admin/dashboard');
                }else {
                    navigate("/");
                }
              }
            }
          } catch(error){
            console.error(error);
           
        }
    }

   

    return (
        <div className="bg-white text-gray-800 overflow-hidden">
            <div className="flex min-h-screen">
                <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
                <div className="text-white">

                    <img src={Saly} alt="Illustration" className="mx-auto" />

                    <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
                    <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
                    <p className="mb-8">
                    Logging in unlocks your personal progress tracker, letting you evaluate your performance and see how you
                    stack up against others. Whether you're preparing for exams, improving your knowledge, or simply having fun,
                    there's no better way to sharpen your mind.
                    </p>
                </div>


                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
                    <span>Welcome to</span>
                    <img src={Logo} className="h-7" />
                    </h2>
                    <h1 className="text-5xl font-bold mb-8">Sign in</h1>

                    <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">Enter your username or email address</label>
                        <input 
                        type="text" 
                        id="username" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        placeholder="Username or email address"
                         />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2">Enter your Password</label>
                        <input 
                        type="password" 
                        id="password" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        placeholder="Password" 
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-6 flex gap-2 items-center">
                         <input
                            type="checkbox"
                            id="admin"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={handleCheckboxChange}
                            className="px-4 py-3 rounded-lg border border-gray-300"
                        />
                        <label htmlFor="admin" className="block ">Login as Admin</label>
                    </div>
                        <button 
                        type="submit"
                        onClick={handleSubmit} 
                        className="w-full bg-primary text-white py-3 rounded-lg mb-4">Sign in</button>

                    </form>

                    <div className="text-center">
                    <NavLink to="/reset" className="text-primary"> Forgot Password</NavLink>
                    </div>

                    <div className="mt-8">
                    <p className="text-center">No Account ? <NavLink to="/register" className="text-primary">Sign up</NavLink></p>
                    <p className="text-center">Forgot Password {' '} ?
                         <NavLink to="/reset" className="text-primary ml-2">
                            Reset Your Password
                         </NavLink></p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}