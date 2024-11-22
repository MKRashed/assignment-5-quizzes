import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "./assets/avater.webp";
import { useAuth } from "./hooks/useAuth";
import useAxios from "./hooks/useAxios";

export default function LeaderBoard(){
  const { auth } = useAuth();
  const { api } = useAxios();
  const [stats, setStats] = useState({});
  const [attempts, setAttempts] = useState([]);
  const { quizId } = useParams(); 

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get(`api/quizzes/${quizId}/attempts`);
        const { stats, attempts } = response.data?.data;
  
        if (Array.isArray(attempts)) {
          // Map attempts with required fields and calculated values
          const mappedAttempts = attempts.map((item) => {
            let totalMarks = 0;
            let correctQuestions = 0;
            let wrongQuestions = 0;
  
            item?.submitted_answers.forEach((submitted) => {
              const correct = item.correct_answers.find(
                (correct) => correct.question_id === submitted.question_id
              );
  
              if (correct) {
                if (submitted.answer && submitted.answer === correct.answer) {
                  totalMarks += correct.marks;
                  correctQuestions += 1;
                } else {
                  wrongQuestions += 1;
                }
              }
            });
  
            return {
              id:item.id,
              user: item.user,
              totalMarks,
              correctQuestions,
              wrongQuestions,
            };
          });
  
          // Sort by totalMarks in descending order and add user position
          const sortedAttempts = mappedAttempts
            .sort((a, b) => b.totalMarks - a.totalMarks)
            .map((attempt, index) => ({
              ...attempt,
              position: index + 1, // Assign position based on sorting order
            }));
  
          setAttempts(sortedAttempts);
        }
  
        setStats(stats);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
  
    fetchLeaderboard();
  }, [quizId]);

  
  const authUser = attempts.find(attempt => attempt.user.email === auth?.user?.email);

  const topAttempts = attempts
    .slice()
    .slice(0, 5);

    return (
        <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <!-- Left Column --> */}
            <div className="bg-primary rounded-lg p-6 text-white">
              <div className="flex flex-col items-center mb-6">
                <img src={Avatar} alt="Profile Pic"
                  className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover" />
                <h2 className="text-2xl font-bold">{authUser?.user?.full_name}</h2>
                <p className="text-xl">{authUser?.position} Position</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm opacity-75">Mark</p>
                  <p className="text-2xl font-bold">{authUser?.totalMarks}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-75">Correct</p>
                  <p className="text-2xl font-bold">{authUser?.correctQuestions}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-75">Wrong</p>
                  <p className="text-2xl font-bold">{authUser?.wrongQuestions}</p>
                </div>
              </div>
            </div>
    
            {/* <!-- Right Column --> */}
            <div>
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <p className="mb-6">React Hooks Quiz</p>
              <ul className="space-y-4">
                { topAttempts.length && topAttempts.map( (attempt, index) =>
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={Avatar} alt="SPD Smith" className="object-cover w-10 h-10 rounded-full mr-4" />
                      <div>
                        <h3 className="font-semibold">{attempt?.user?.full_name}</h3>
                        <p className="text-sm text-gray-500">{attempt?.position} position</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">{attempt?.totalMarks}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
}