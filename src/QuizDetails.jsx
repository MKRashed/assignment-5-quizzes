import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "./assets/avater.webp";
import { useAuth } from "./hooks/useAuth";
import useAxios from "./hooks/useAxios";


export default function QuizDetails(){
    const navigate = useNavigate();
    const { quizId } = useParams(); 
    const { auth } = useAuth();
    const { api } = useAxios();
    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

   useEffect(() => {
        const fetchQuizzes = async () => {
          try {
            const response = await api.get(`api/quizzes/${quizId}`);
            const updateQuizzes = response.data?.data;

            const { id, title, description, status, stats, user_attempt = 0 } = updateQuizzes;

            setQuiz({
                id,
                title,
                description,
                status,
                stats,
                user_attempt
            });
             
            if (Array.isArray(updateQuizzes.questions)) {
              setQuestions(updateQuizzes.questions);
            }
          } catch (error) {
            console.error("Error fetching quizzes:", error);
          }
        };
    
        fetchQuizzes();
      }, []); 

     const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }
      }
     const prevQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
          }
      }

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerChange  = (questionId, option) => {
        setAnswers(prevAnswers => ({
          ...prevAnswers,
          [questionId]: option,
        }));
      };

    const handleSubmit = async() => {
        const response = await api.post(`api/quizzes/${quizId}/attempt`, {
            answers: answers
        });

        if(response.status === 200){
            navigate(`/result/${quizId}`)
        }
        
      };

    return (
        <div className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
                {/* <!-- Left Column --> */}
                <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
                <div>
                    <h2 className="text-4xl font-bold mb-4">{quiz?.title}</h2>
                    <p className="text-gray-600 mb-4">
                    {quiz?.description}
                    </p>

                    <div className="flex flex-col">
                    <div
                        className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                        Total number of questions : {quiz?.stats?.total_questions}
                    </div>

                    <div
                        className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                        Participation : {quiz?.stats?.total_attempts}
                    </div>

                    <div
                        className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                        Remaining :{ questions.length - currentQuestionIndex}
                    </div>
                    </div>
                </div>

                <div className="mt-auto flex items-center">
                    <img src={Avatar} alt="Mr Hasan" className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <span className="text-black font-semibold">{auth?.user?.full_name}</span>
                </div>
                </div>

                {/* <!-- Right Column --> */}

                <div className="lg:col-span-2 bg-white">
                    <div className="bg-white p-6 !pb-2 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-semibold">{ currentQuestion?.question} </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">

                        {currentQuestion?.options?.map((option, index) => (
                                <label key={index} className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
                                <input 
                                    type="checkbox" 
                                    name={`question${currentQuestion.id}`}
                                    value={option}
                                    checked={answers[currentQuestion.id] === option}
                                    className="form-checkbox text-buzzr-purple"
                                    onChange={() => handleAnswerChange(currentQuestion.id, option)}
                                />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {/* <button 
                                onClick={prevQuestion}
                                disabled={currentQuestionIndex === questions.length - 1}
                                className="w-1/2 text-center ml-auto block bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8">
                                Previous
                            </button> */}
                            
                            { currentQuestionIndex !== questions.length - 1 ? 
                            (<button 
                                    onClick={nextQuestion}
                                    disabled={currentQuestionIndex === questions.length - 1}
                                    className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8">
                                    Next
                                </button>) : (<button 
                                    onClick={handleSubmit}
                                    className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8">
                                    Submit
                                </button>)}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}