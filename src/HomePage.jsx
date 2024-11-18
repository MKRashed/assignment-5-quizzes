import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import QuizCard from "./QuizCard";

export default function HomePage(){
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