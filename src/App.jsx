import { Route, Routes } from "react-router-dom";
import QuizSetPage from "./admin//QuizSetPage";
import Dashboard from "./admin/Dashboard";
import QuizQuestionEntry from "./admin/QuizSetEntryPage";
import Home from "./HomePage";
import LeaderBoard from "./LeaderBoard";
import Login from "./page/Login";
import Registration from "./page/Register";
import QuizDetails from "./QuizDetails";
import Result from "./Result";
import AdminRoutes from "./routes/AdminRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Login />} path="/login" />
        <Route element={<Registration />} path="/register" />
        <Route element={<AdminRoutes />} path="/admin/">
          <Route element={<Dashboard />} path="dashboard" />
          <Route element={<QuizSetPage />} path="quiz-set" />
          <Route
            element={<QuizQuestionEntry />}
            path="quiz-questions/:quizId"
          />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<Result />} path="/result/:quizId" />
          <Route path="/quiz-details/:quizId" element={<QuizDetails />} />
          <Route path="/leader-board/:quizId" element={<LeaderBoard />} />
        </Route>

        {/* <Route element={<NotFoundPage />} path="*" /> */}
      </Routes>
    </>
  );
}

export default App;
