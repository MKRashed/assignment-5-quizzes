
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import LogoWhite from "./assets/logo-white.svg";
import CircularProgressBar from "./components/ProgressBar";
import useAxios from "./hooks/useAxios";


export default function Result(){
  const { api } = useAxios();
  const [submitted_answers, setSubmittedAnswers] = useState([]);
  const [correct_answers, setCorrectAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [stats, setStats] = useState({});
  const [totalMarks, setTotalMarks] = useState(0);
  const [correctQuestions , setCorrectTotalQuestions] = useState(0);
  const [wrongQuestions , setWrongTotalQuestions] = useState(0);

  const { quizId } = useParams(); 

  console.log({a:submitted_answers, c: correct_answers});
  

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await api.get(`api/quizzes/${quizId}/attempts`);
        const { quiz, stats, attempts } = response.data?.data;
        console.log({attempts});
        
        const submitted = attempts[0]?.submitted_answers || [];
        const correct = attempts[0]?.correct_answers || [];
    
        // Set state variables
        setQuiz(quiz);
        setStats(stats);
        setSubmittedAnswers(submitted);
        setCorrectAnswers(correct);
        
        
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
  
    fetchResult();
  }, []); 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get(`api/quizzes/${quizId}`);
        const updateQuizzes = response.data?.data;
        if (Array.isArray(updateQuizzes.questions)) {
          setQuestions(updateQuizzes.questions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []); 

  useEffect(() => {
    if (submitted_answers?.length) {

      let totalMarks = 0;
      let correctQuestions = 0;
      let wrongQuestions = 0;
     
      submitted_answers.forEach((submitted) => {
        // Find the corresponding correct answer
        const correct = correct_answers.find(
          (correct) => correct.question_id === submitted.question_id
        );
  
        if (correct) {
          if (submitted.answer && submitted.answer === correct.answer) {
            totalMarks += correct.marks; // Add marks for correct answers
            correctQuestions += 1; // Increment correct question count
          } else {
            wrongQuestions += 1; // Increment wrong question count
          }
        }
      });
  
      setTotalMarks(totalMarks); 
      setCorrectTotalQuestions(correctQuestions);
      setWrongTotalQuestions(wrongQuestions); 
    }
  }, [submitted_answers, correct_answers]);

  const percentage = ((totalMarks / quiz?.total_marks) * 100).toFixed(2);

  
    return (
        <div className="flex min-h-screen overflow-hidden">
        <img src={LogoWhite} className="max-h-11 fixed left-6 top-6 z-50" />
        {/* <!-- Left side --> */}
        <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
          <div>
            <div className="text-white">
              <div>
                <h2 className="text-4xl font-bold mb-2">{quiz?.title}
                </h2>
                <p>{quiz?.description}</p>
              </div>
    
              <div className="my-6 flex items-center  ">
                <div className="w-1/2">
                  <div className="flex gap-6 my-6">
                    <div>
                      <p className="font-semibold text-2xl my-0">{quiz?.total_questions}</p>
                      <p className="text-gray-300">Questions</p>
                    </div>
    
                    <div>
                      <p className="font-semibold text-2xl my-0">{correctQuestions}</p>
                      <p className="text-gray-300">Correct</p>
                    </div>
    
                    <div>
                      <p className="font-semibold text-2xl my-0">{wrongQuestions}</p>
                      <p className="text-gray-300">Wrong</p>
                    </div>
                  </div>
    
                  <NavLink to={`/leader-board/${quiz?.id}`}
                    className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white">
                    View Leaderboard
                  </NavLink>
                </div>
    
                <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                  <div className="flex-1">
                    <p className="text-2xl font-bold"> {totalMarks} / {quiz?.total_marks}</p>
                    <p>Your Mark</p>
                  </div>
                  <div>
                    <CircularProgressBar percentage={percentage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
        {/* <!-- Right side --> */}
        <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
          <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
            <div className="px-4">
              {/* <!-- Question One --> */}

              {
                questions.map((question, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-sm mb-4">
                    <div className="bg-white p-6 !pb-2">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                          {question?.question}
                        </h3>
                      </div>
                      <div className="space-y-2">

                      {question?.options?.map((option, idx) => {
                          // Check if this option is submitted and if it's correct
                          const isSubmitted = submitted_answers.some(
                            (answer) =>
                              answer.question_id === question.id && answer.answer === option
                          );
                          const isCorrect = correct_answers.some(
                            (correct) =>
                              correct.question_id === question.id && correct.answer === option
                          );

                          // Determine the appropriate classes
                          const optionClasses = [
                            "flex items-center space-x-3 py-3 px-4 rounded-md text-lg",
                            isSubmitted && isCorrect
                              ? "bg-green-100 text-green-800" // Correct Answer
                              : isSubmitted && !isCorrect
                              ? "bg-red-100 text-red-800" // Incorrect Answer
                              : "bg-primary/5 text-gray-800", // Default
                          ].join(" ");

                          return (
                            <label key={idx} className={optionClasses}>
                              <input
                                type="checkbox"
                                name={`question${question.id}`}
                                value={option}
                                checked={isSubmitted}
                                readOnly
                                className="form-checkbox text-buzzr-purple"
                              />
                              <span>{option}</span>
                            </label>
                          );
                        })}


                         {/* {question?.options?.map((option, index) => (
                                <label key={index} className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
                                <input 
                                    type="checkbox" 
                                    name={`question${question.id}`}
                                    value={option}
                                    checked='asdf'
                                    className="form-checkbox text-buzzr-purple"
                                />
                                    <span>{option}</span>
                                </label>
                            ))} */}
                        {/* <label className="flex items-center space-x-3">
                          <input type="radio" name="answer1" className="form-radio text-buzzr-purple" checked />
                          <span>Inorder</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="answer1" className="form-radio text-buzzr-purple" />
                          <span>Preorder</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="answer1" className="form-radio text-buzzr-purple" />
                          <span>Postorder</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="answer1" className="form-radio text-buzzr-purple" />
                          <span>Crossorder</span>
                        </label> */}
                      </div>
                    </div>
                    {/* <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                      <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                      <button className="text-primary hover:text-primary/80 font-medium">Edit Question</button>
                    </div> */}
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </div>
    );
}