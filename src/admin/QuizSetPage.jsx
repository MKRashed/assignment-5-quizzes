import { NavLink } from "react-router-dom";

export default function QuizSetPage(){
    return (
        <div class="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <NavLink to="#" class="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
                        </path>
                    </svg>
                    Back to home
                </NavLink>

                <h2 class="text-3xl font-bold mb-6">Give your quiz title and description</h2>

                <form>
                    <div class="mb-4">
                        <label for="quiz-title" class="block text-sm font-medium text-gray-700 mb-1">Quiz title</label>
                        <input type="text" id="quiz-title" name="quiz-title"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                        placeholder="Quiz" />
                    </div>

                    <div class="mb-6">
                        <label for="quiz-description" class="block text-sm font-medium text-gray-700 mb-1">Description
                        (Optional)</label>
                        <textarea id="quiz-description" name="quiz-description" rows="4"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                        placeholder="Description"></textarea>
                    </div>

                    <NavLink to="./quiz_set_entry_page.html" type="submit"
                        class="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Next
                    </NavLink>
                </form>
            </div>
            </div>
        </div>
    );
}