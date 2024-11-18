import { NavLink } from "react-router-dom";
import Avatar from "../assets/avater.webp";
import Logo from "../assets/logo-white.svg";

export default function SideNav(){
    return (
        <aside className="hidden md:w-64 bg-primary p-6 md:flex flex-col">
            <div className="mb-10">
            <img src={Logo} className="h-7" />
            </div>
            <nav className="flex-grow">
                <ul className="space-y-2">
                    <li>
                        <NavLink to="#" 
                        className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold">
                            Quizzes
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="#" 
                            className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">
                            Settings
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="#" 
                            className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">
                            Manage Users
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="#" 
                            className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">
                            Manage Roles
                        </NavLink>
                    </li>

                    <li>
                        <button className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="mt-auto flex items-center">
            <img src={Avatar} alt="Mr Hasan" className="w-10 h-10 rounded-full mr-3 object-cover" />
            <span className="text-white font-semibold">Saad Hasan</span>
            </div>
        </aside>
    );
}