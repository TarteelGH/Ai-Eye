import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import LoginScreen from "@/components/LoginScreen";
import RegisterScreen from "@/components/RegisterScreen";

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/diagnosis" replace />
              ) : showRegister ? (
                <RegisterScreen
                  onRegister={handleLogin}
                  onBackToLogin={() => setShowRegister(false)}
                />
              ) : (
                <LoginScreen
                  onLogin={handleLogin}
                  onRegister={() => setShowRegister(true)}
                />
              )
            }
          />
          <Route
            path="/diagnosis"
            element={
              isLoggedIn
                ? <div className="text-white p-8">Welcome, {username}! 🎉</div>
                : <Navigate to="/" replace />
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;