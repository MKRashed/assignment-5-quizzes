import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

export default function QuizSetEntryPage(){
    const {api} = useAxios();
    const [quizDetails, setQuizDetails] = useState({});
    const [questions, setQuestions] = useState([]);
    const [isPublished, setIsPublished] = useState('');
    const [editQuestionId, setEditQuestionId] = useState('');

    const [quiz, setQuiz] = useState({
        question: "",
        options: ["", "", "", ""], 
        correctAnswer: "",
    });

    const quizId = useParams().quizId;

    const handleQuestionChange = (e) => {
        setQuiz({ ...quiz, question: e.target.value });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...quiz.options];
        updatedOptions[index] = value;
        setQuiz({ ...quiz, options: updatedOptions });
    };

    const handleCorrectAnswerChange = (value) => {
        setQuiz({ ...quiz, correctAnswer: value });
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await api.get(`api/admin/quizzes`);

                const filterQuiz = response?.data.find((quiz) => quiz.id ===  quizId)

                setIsPublished(filterQuiz?.status)
                setQuizDetails(filterQuiz)
    
                if (Array.isArray(filterQuiz?.Questions)) {
                    setQuestions(filterQuiz?.Questions);
                } else {
                    console.warn("Questions data is not an array:", response?.data?.questions);
                }
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
    
        // Call the async function
        if (quizId) fetchQuizzes();
    }, [quizId]);
    
    const updateQuiz = async (e) => {

        setIsPublished(e.target.checked ? 'published':'draft');

        const status =  e.target.checked ? 'published':'draft';
        

        try {
          const response = await api.patch(`api/admin/quizzes/${quizId}`,{
            status: status,
          });
        } catch (error) {
          console.error("Error fetching quizzes:", error);
        }
    };


    const handleSaveQuiz = async() =>{
        try {
            const response = await api.post(`api/admin/quizzes/${quizId}/questions`,quiz);
            if (response.status === 200 || response.status === 201) {
                console.log(response?.data?.data);
                
                setQuestions((prevQuestions) => [...prevQuestions, response?.data?.data]);
                alert("Quiz saved successfully!");
                setQuiz({
                    question: "",
                    options: ["", "", "", ""],
                    correctAnswer: "",
                });
            } else {
                console.error("Unexpected response status:", response.status);
                alert("Failed to save quiz. Please try again.");
            }
            
          } catch (error) {
            console.error("Error saving quiz:", error);
            alert(
                error.response?.data?.message || "An error occurred while saving the quiz."
            );
          }
    }

    const handleQuestionDelete = async (questionId) => {

        const isConfirmed = window.confirm("Are you sure you want to delete this question? This action cannot be undone.");
    
        if (isConfirmed) {
            try {
                const response = await api.delete(`api/admin/questions/${questionId}`);
                
                if (response.status === 200) {
                    console.log(`Question with ID ${questionId} deleted successfully.`);
                    setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId));
                } else {
                    console.error("Failed to delete the question.");
                }
            } catch (error) {
                console.error("Error deleting question:", error);
            }
        } else {
            console.log("Question deletion canceled.");
        }
        
    }

    const handleQuestionEdit = async( questionId ) => {
        const editData = questions.find( (item) => (item.id === questionId) );
        setQuiz(editData);
        setEditQuestionId(questionId)
    }
    
    const handleUpdateQuiz = async() => {
        try {
            const response = await api.patch(`api/admin/questions/${editQuestionId}`,quiz);

            if (response.status === 200 || response.status === 201) {
                setQuestions((prevQuestions) => [...prevQuestions, response?.data?.data]);
                alert("Update saved successfully!");
                setQuiz({
                    question: "",
                    options: ["", "", "", ""],
                    correctAnswer: "",
                });
            }
            
          } catch (error) {
            console.error("Error update quiz:", error);
            alert(
                error.response?.data?.message || "An error occurred while updating the quiz."
            );
          }
        
    }
    

    return (
        <>
            <div className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
                <div>
                <nav className="text-sm mb-4" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <NavLink to="#" className="text-gray-600 hover:text-buzzr-purple">Home</NavLink>
                        <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                        </svg>
                    </li>
                    <li>
                        <NavLink to="#" className="text-gray-600 hover:text-buzzr-purple" aria-current="page">
                            Quizzes
                        </NavLink>
                    </li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
                    {/* <!-- Left Column --> */}
                    <div className="">
                    <div className="mb-6 flex gap-2 items-center">
                        <input
                            type="checkbox"
                            id="published"
                            value="published"
                            checked={isPublished === 'published'}
                            onClick={updateQuiz}
                            className="px-4 py-3 h-5 w-5 rounded-lg border border-gray-300"
                        />
                        <label htmlFor="admin" className="block text-lg font-bold">Quiz Status {quizDetails?.status} </label>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                        { quizDetails?.title }</h2>
                    <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                        Total number of questions :  { quizDetails?.Questions?.length }
                    </div>
                    <p className="text-gray-600 mb-4">
                    { quizDetails?.description }
                    </p>

                    <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

            {/* Question Title */}
            <div>
                <label
                    htmlFor="quizTitle"
                    className="block text-sm font-medium text-foreground mb-1"
                >
                    Question Title
                </label>
                <input
                    type="text"
                    id="quizTitle"
                    name="quizTitle"
                    value={quiz.question}
                    onChange={handleQuestionChange}
                    className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                    placeholder="Enter quiz title"
                />
            </div>

            {/* Options */}
            <p className="text-sm text-gray-600 mt-4">Add Options</p>
            <div id="optionsContainer" className="space-y-2 mt-4">
                {quiz.options.map((option, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
                    >
                        <input
                            type="radio"
                            id={`option${index}`}
                            name="correctAnswer"
                            value={option}
                            checked={quiz.correctAnswer === option}
                            onChange={() => handleCorrectAnswerChange(option)}
                            className="text-primary focus:ring-0 w-4 h-4"
                        />
                        <label htmlFor={`option${index}`} className="sr-only">
                            Option {index + 1}
                        </label>
                        <input
                            type="text"
                            id={`optionText${index}`}
                            name={`optionText${index}`}
                            value={option}
                            onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                            }
                            className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                            placeholder={`Option ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {/* Save Button */}

            {quiz.id ? (
                <button
                onClick={handleUpdateQuiz}
                className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
            >
                Update Quiz
            </button>
            ) : (
                <button
                    onClick={handleSaveQuiz}
                    className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                Save Quiz
            </button>
            )}
        </div>

                    </div>

                    {/* <!-- Right Column --> */}
                    <div className="px-4">
                        {/* <!-- Question One --> */}
                        { questions.length &&
                            questions.map((question, index) => {
                                return (
                                    <div key={index} className="rounded-lg overflow-hidden shadow-sm mb-4">
                                        <div className="bg-white p-6 !pb-2">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-semibold">
                                                    {question?.question}
                                                </h3>
                                            </div>

                                            <div className="space-y-2">
                                                {question.options.map((option, optionIndex) => (
                                                    <label key={optionIndex} className="flex items-center space-x-3">
                                                        <input
                                                            type="radio"
                                                            name={`answer${index}`} // Dynamic name for each question group
                                                            className="form-radio text-buzzr-purple"
                                                            value={option}
                                                            checked={option === question.correctAnswer} // Check if option is the correct one
                                                        />
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                                            <button type="button" onClick={() => handleQuestionDelete(question.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                            <button onClick={() => handleQuestionEdit(question.id)} className="text-primary hover:text-primary/80 font-medium">Edit Question</button>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
                </div>
            </div>
        </>
    );
}