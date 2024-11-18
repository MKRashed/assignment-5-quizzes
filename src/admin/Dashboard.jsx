import { NavLink } from "react-router-dom";

export default function Dashboard(){
    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div class="flex-grow p-10">
                <header class="mb-8">
                    <h2 class="text-2xl font-semibold">Hey There 👋!</h2>
                    <h1 class="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NavLink to="./quiz_set_page.html" class="group">
                    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
                    <div class="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">Create a new quiz</h3>
                    <p class="text-gray-600 text-sm group-hover:scale-105 transition-all">Build from the ground up</p>
                    </div>
                </NavLink>

                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
                    <div class="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
                        <path d="M12 12l4 -2.25l4 -2.25" />
                        <path d="M12 12l0 9" />
                        <path d="M12 12l-4 -2.25l-4 -2.25" />
                        <path d="M20 12l-4 2v4.75" />
                        <path d="M4 12l4 2l0 4.75" />
                        <path d="M8 5.25l4 2.25l4 -2.25" />
                    </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">JavaScript Basics Quiz</h3>
                    <p class="text-gray-600 text-sm group-hover:scale-105 transition-all">Test knowledge of core JavaScript
                    </p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
                    <div class="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
                        <path d="M12 12l4 -2.25l4 -2.25" />
                        <path d="M12 12l0 9" />
                        <path d="M12 12l-4 -2.25l-4 -2.25" />
                        <path d="M20 12l-4 2v4.75" />
                        <path d="M4 12l4 2l0 4.75" />
                        <path d="M8 5.25l4 2.25l4 -2.25" />
                    </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">React Hooks Quiz</h3>
                    <p class="text-gray-600 text-sm group-hover:scale-105 transition-all">Test knowledge of core JavaScript</p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group">
                    <div class="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
                        <path d="M12 12l4 -2.25l4 -2.25" />
                        <path d="M12 12l0 9" />
                        <path d="M12 12l-4 -2.25l-4 -2.25" />
                        <path d="M20 12l-4 2v4.75" />
                        <path d="M4 12l4 2l0 4.75" />
                        <path d="M8 5.25l4 2.25l4 -2.25" />
                    </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">Backend vs. Frontend Quiz</h3>
                    <p class="text-gray-600 text-sm group-hover:scale-105 transition-all">Test knowledge of core JavaScript</p>
                </div>
                </div>
            </div>
        </div>
    );
}