import { useEffect, useState } from "react";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import QuizCard from "./QuizCard";
import useAxios from "./hooks/useAxios";

export default function HomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const { api } = useAxios();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.get("api/quizzes");
        const updateQuizzes = response.data?.data;
        if (Array.isArray(updateQuizzes)) {
          setQuizzes(updateQuizzes);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <div className="max-w-7xl mx-auto  py-3">
        <HeroSection />
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => <QuizCard key={index} quiz={quiz} />)
        ) : (
          <p>No quizzes available</p>
        )}
        <Footer />
      </div>
    </div>
  );
}
