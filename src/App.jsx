import { Route, Routes } from "react-router-dom";
import Home from "./HomePage";
import Login from "./page/Login";
import Registration from "./page/Register";
import PrivateRoutes from "./routes/PrivateRoutes";
import Result from "./Result";
import QuizDetails from "./QuizDetails";

function App() {
  return (
    <>
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Home />} path="/" exact />
        <Route element={<Result />} path="/result" />
        <Route path="/quiz-details/:quizId" element={<QuizDetails />} />
      </Route>
      <Route element={<Login />} path="/login" />
      <Route element={<Registration />} path="/register" />
      {/* <Route element={<NotFoundPage />} path="*" /> */}
    </Routes>
  </>
  )
}

export default App