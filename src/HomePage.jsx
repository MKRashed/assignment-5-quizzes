import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import QuizCard from "./QuizCard";
import useAxios from "./hooks/useAxios";

export default function HomePage(){

    const { api } = useAxios();

    useEffect( () => {

     const response =  api.get('api/quizzes');

    }, [])

    return (
        <div className="bg-[#F5F3FF] min-h-screen">
            <div className="max-w-7xl mx-auto  py-3">
                <Header/>
                <HeroSection/>
                <QuizCard/>
                <Footer/>
            </div>
        </div>
    );
}