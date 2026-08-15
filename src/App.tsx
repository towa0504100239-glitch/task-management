import {BrowserRouter,Routes,Route} from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import CalendarPage from "./pages/calendar/CalendarPage";
import TaskPage from "./pages/task/TaskPage";
import TaskCreatePage from "./pages/task/TaskCreatePage";
import TaskDetailPage from "./pages/task/TaskDetailPage";
import TaskEditPage from "./pages/task/TaskEditPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/task" element={<TaskPage />}/>
        <Route path="/task/create" element={<TaskCreatePage />}/>
        <Route path="/task/:id" element={<TaskDetailPage />}/>
        <Route path="/task/:id/edit" element={<TaskEditPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;