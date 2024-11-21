import { Route, Routes } from "react-router-dom";
import Home from "./HomePage";
import Login from "./page/Login";
import Registration from "./page/Register";
import QuizDetails from "./QuizDetails";
import Result from "./Result";
import PrivateRoutes from "./routes/PrivateRoutes";
import LeaderBoard from "./LeaderBoard";

function App() {
  return (
    <>
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Home />} path="/" exact />
        <Route element={<Result />} path="/result/:quizId" />
        <Route path="/quiz-details/:quizId" element={<QuizDetails />} />
        <Route path="/leader-board/:quizId" element={<LeaderBoard />} />
      </Route>
      <Route element={<Login />} path="/login" />
      <Route element={<Registration />} path="/register" />
      {/* <Route element={<NotFoundPage />} path="*" /> */}
    </Routes>
  </>
  )
}

export default App