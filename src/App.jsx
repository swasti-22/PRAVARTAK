import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ApiStateProvider } from "./context/ApiStateContext";
import { AppLayout } from "./components/AppLayout";

// Import Pages
import { LanguageSelection } from "./pages/LanguageSelection";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ContextQuestions } from "./pages/ContextQuestions";
import { Processing } from "./pages/Processing";
import { ActionPlan } from "./pages/ActionPlan";
import { ProgressTracker } from "./pages/ProgressTracker";
import { Feedback } from "./pages/Feedback";

// Guard: Ensures language is chosen before sign up or login
const LanguageGuard = ({ children }) => {
  const hasLang = localStorage.getItem("pravartak_lang");
  if (!hasLang) {
    return <Navigate to="/language" replace />;
  }
  return children;
};

// Guard: Protects dashboard routes
const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppContent = () => {
  return (
    <AppLayout>
      <Routes>
        {/* Language Selection - First Screen */}
        <Route path="/language" element={<LanguageSelection />} />

        {/* Auth Flow - Requires language selection */}
        <Route
          path="/signup"
          element={
            <LanguageGuard>
              <SignUp />
            </LanguageGuard>
          }
        />
        <Route
          path="/login"
          element={
            <LanguageGuard>
              <Login />
            </LanguageGuard>
          }
        />

        {/* Dashboard Flow - Requires both language and authentication */}
        <Route
          path="/home"
          element={
            <LanguageGuard>
              <AuthGuard>
                <Home />
              </AuthGuard>
            </LanguageGuard>
          }
        />
        <Route
          path="/context"
          element={
            <LanguageGuard>
              <AuthGuard>
                <ContextQuestions />
              </AuthGuard>
            </LanguageGuard>
          }
        />
        <Route
          path="/processing"
          element={
            <LanguageGuard>
              <AuthGuard>
                <Processing />
              </AuthGuard>
            </LanguageGuard>
          }
        />
        <Route
          path="/action-plan"
          element={
            <LanguageGuard>
              <AuthGuard>
                <ActionPlan />
              </AuthGuard>
            </LanguageGuard>
          }
        />
        <Route
          path="/tracker"
          element={
            <LanguageGuard>
              <AuthGuard>
                <ProgressTracker />
              </AuthGuard>
            </LanguageGuard>
          }
        />
        <Route
          path="/feedback"
          element={
            <LanguageGuard>
              <AuthGuard>
                <Feedback />
              </AuthGuard>
            </LanguageGuard>
          }
        />

        {/* Catch-all redirecting to language selection */}
        <Route path="*" element={<Navigate to="/language" replace />} />
      </Routes>
    </AppLayout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <ApiStateProvider>
            <AppContent />
          </ApiStateProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
