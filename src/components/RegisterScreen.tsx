import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";

interface RegisterScreenProps {
  onRegister: (username: string) => void;
  onBackToLogin: () => void;
}

const RegisterScreen = ({ onRegister, onBackToLogin }: RegisterScreenProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"Doctor" | "Admin">("Doctor");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      onRegister(username);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 shadow-2xl">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="AI Eye Logo" className="w-32 h-32 object-contain" />
          </div>

          <h2 className="text-xl font-bold text-white text-center mb-1">Create Account</h2>
          <p className="text-sm text-gray-400 text-center mb-6">Join the AI Eye platform</p>

          <div className="space-y-4">

            {/* Username */}
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Role</label>
              <div className="grid grid-cols-2 gap-2">
                {(["Doctor", "Admin"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-all border ${
                      role === r
                        ? "bg-teal-600 border-teal-500 text-white"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-teal-500/30"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Min. 6 characters"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Repeat your password"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder:text-gray-600 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-400">{error}</p>}

            {/* Submit */}
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-60 py-2.5 text-sm font-semibold text-white transition-all"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>

            {/* Back to login */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={onBackToLogin}
                className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;