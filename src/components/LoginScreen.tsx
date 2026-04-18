import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";

interface LoginScreenProps {
  onLogin: (username: string) => void;
  onRegister: () => void;
}

const LoginScreen = ({ onLogin, onRegister }: LoginScreenProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      onLogin(username);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 shadow-2xl">

          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="AI Eye Logo" className="w-64 h-64 object-contain" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your username"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder:text-gray-600 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-60 py-2.5 text-sm font-semibold text-white transition-all"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                onClick={onRegister}
                className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;