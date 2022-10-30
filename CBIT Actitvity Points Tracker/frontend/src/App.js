import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Public/Home";
import Footer from "./pages/Public/Footer";
import Login from "./pages/Public/Login";
import PageNotFound from "./pages/Public/PageNotFound";
import Admin from "./components/Admin";
import Mentor from "./components/Mentor";
import Student from "./components/Student";
import AdminDashboard from "./pages/Admin/Dashboard";
import MentorDashboard from "./pages/Mentor/Dashboard";
import StudentDashboard from "./pages/Student/Dashboard";
import AdminProfile from "./pages/Admin/AdminProfile";
import MentorProfile from "./pages/Mentor/MentorProfile";
import StudentProfile from "./pages/Student/StudentProfile";
import Classes from "./pages/Admin/Classes";
import Activities from "./pages/Admin/Activities";
import MentorActivities from "./pages/Mentor/Activities";
import Students from "./pages/Admin/Students";
import Mentors from "./pages/Admin/Mentors";
import Register from "./pages/Admin/Register";
import StudentActivities from "./pages/Student/Activities";
import StudentQueries from "./pages/Student/Queries";
import MentorQueries from "./pages/Mentor/Queries";

const AdminLayout = () => (
  <div>
    <h1 className="hidden">Admin Layout</h1>
    {/* <AdminDashboard /> */}
    <Outlet />
  </div>
);

const MentorLayout = () => (
  <div>
    <h1 className="hidden">Mentor Layout</h1>
    <Outlet />
  </div>
);

const StudentLayout = () => (
  <div>
    <h1 className="hidden">Student Layout</h1>
    <Outlet />
  </div>
);

const PublicLayout = () => (
  <div>
    <h1 className="hidden">Public Layout</h1>
    <Outlet />
  </div>
);

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="app min-h-screen">
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            {/* Admin Routes */}
            <Route
              path="admin/dashboard"
              element={
                user ? (
                  <Admin adminComponent={<AdminDashboard />} dashboard={true} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/profile"
              element={
                user ? (
                  <Admin adminComponent={<AdminProfile />} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/register"
              element={
                user ? (
                  <Admin adminComponent={<Register />} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/classes"
              element={
                user ? (
                  <Admin adminComponent={<Classes />} class={true} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/activities"
              element={
                user ? (
                  <Admin adminComponent={<Activities />} activities={true} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/students"
              element={
                user ? (
                  <Admin adminComponent={<Students />} students={true} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="admin/mentors"
              element={
                user ? (
                  <Admin adminComponent={<Mentors />} mentors={true} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
          </Route>
          {/* Mentor Routes */}
          <Route element={<MentorLayout />}>
            <Route
              path="mentor/dashboard"
              element={
                user ? (
                  <Mentor
                    mentorComponent={<MentorDashboard />}
                    dashboard={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="mentor/activities"
              element={
                user ? (
                  <Mentor
                    mentorComponent={<MentorActivities />}
                    activities={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="mentor/profile"
              element={
                user ? (
                  <Mentor mentorComponent={<MentorProfile />} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />

            <Route
              path="mentor/queries"
              element={
                user ? (
                  <Mentor
                    mentorComponent={<MentorQueries />}
                    queries={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
          </Route>

          {/* Student Routes */}
          <Route element={<StudentLayout />}>
            <Route
              path="student/dashboard"
              element={
                user ? (
                  <Student
                    studentComponent={<StudentDashboard />}
                    dashboard={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="student/profile"
              element={
                user ? (
                  <Student studentComponent={<StudentProfile />} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="student/activities"
              element={
                user ? (
                  <Student
                    studentComponent={<StudentActivities />}
                    activities={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="student/queries"
              element={
                user ? (
                  <Student
                    studentComponent={<StudentQueries />}
                    queries={true}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
          </Route>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<UserRegister />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
