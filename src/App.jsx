import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/home/Home";
import Courses from "./pages/courses/Courses";
import Results from "./pages/results/Results";
import StudyMaterial from "./pages/studyMaterial/StudyMaterial";
import Contact from "./pages/contact/Contact";
import Counseling from "./pages/Counseling";
import OurTeam from "./pages/team/OurTeam";
import HomeTuition from "./pages/homeTuition/HomeTuition";

// ADMIN
import AdminPage from "./pages/admin/AdminPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminVerify from "./pages/admin/AdminVerify";
import AdminProtectedLayout from "./pages/admin/AdminProtectedLayout";

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}

      <main>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/results" element={<Results />} />
          <Route path="/studymaterial" element={<StudyMaterial />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/counseling" element={<Counseling />} />
          <Route path="/ourteam" element={<OurTeam />} />
          <Route path="/hometuition" element={<HomeTuition />} /> 

          {/* ADMIN PUBLIC */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-verify" element={<AdminVerify />} />

          {/* 🔒 PROTECTED ADMIN */}
          <Route element={<AdminProtectedLayout />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          {/* OPTIONAL: fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </Router>
  );
}