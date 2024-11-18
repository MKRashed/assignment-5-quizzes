import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import QuizSetEntryPage from "./admin/QuizSetEntryPage";
import QuizSetPage from "./admin/QuizSetPage";
import HomePage from "./HomePage";
import LeaderBoard from "./LeaderBoard";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Reset from "./page/Reset";
import QuizDetails from "./QuizDetails";
import Result from "./Result";
import AdminRoutes from "./routes/AdminRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route element={<PrivateRoutes />}>
            <Route path="/home"  element={<Home />} />
            <Route path="/quiz-details" element={<QuizDetails />} />
            <Route path="/result" element={<Result />} />
            <Route path="/leader-board" element={<LeaderBoard/> } />
          </Route>

          <Route path="/admin/" element={<AdminRoutes/>} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="quiz-set" element={<QuizSetPage />} />
            <Route path="quiz-set-entry" element={<QuizSetEntryPage />} />
          </Route>

          <Route path="/"  element={<HomePage />}/>
          
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/register" 
            element={<Register />} 
          />
          <Route 
            path="/reset" 
            element={<Reset />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App