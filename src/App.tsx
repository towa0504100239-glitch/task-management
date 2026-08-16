import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import CalendarPage from "./pages/calendar/CalendarPage";
import TaskPage from "./pages/task/TaskPage";
import TaskCreatePage from "./pages/task/TaskCreatePage";
import TaskEditPage from "./pages/task/TaskEditPage";
import StatisticsPage from "./pages/statistics/StatisticsPage";
import OtherPage from "./pages/other/OtherPage";
import ProfileEditPage from "./pages/profile/ProfileEditPage";
import PasswordChangePage from "./pages/profile/PasswordChangePage";
import TermsPage from "./pages/other/TermsPage";
import PrivacyPage from "./pages/other/PrivacyPage";
import RetrospectivePage from "./pages/retrospective/RetrospectivePage";
import { TaskProvider } from "./context/TaskContext"; 

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/task/create" element={<TaskCreatePage />} />
          <Route path="/task/:id/edit" element={<TaskEditPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/other" element={<OtherPage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/profile/password" element={<PasswordChangePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route
            path="/retrospective"
            element={<RetrospectivePage />}
          />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}
export default App;