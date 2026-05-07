import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(`Error: ${error.message}`);
    } else {
      toast.success(`Successful! ${data}`);
    }

    localStorage.setItem('userEmail', email);
    navigate('/dashboard');

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#121212" }}
    >
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
            TaskFlow
          </h1>
          <p style={{ color: "#9CA3AF" }}>Minimalist Kanban Task Manager</p>
        </div>

        <Toaster position="top-right" reverseOrder={false} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="w-full px-4 py-3 rounded border outline-none transition-all focus:border-[#7C3AED]"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "#2A2A2A",
                color: "#FFFFFF",
              }}
            />
          </div>

          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded border outline-none transition-all focus:border-[#7C3AED]"
              style={{
                backgroundColor: "#1E1E1E",
                borderColor: "#2A2A2A",
                color: "#FFFFFF",
              }}
            />

            <button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-sm font-medium"
              style={{ color: "#aaaaaa" }}
            >
              {isShowPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-semibold cursor-pointer transition-colors"
            style={{
              backgroundColor: "#7C3AED",
              color: "#FFFFFF",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#6D28D9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#7C3AED")
            }
          >
            {loading ? "Processing..." : (isSignUp ? "Create account" : "Sign In")}
          </button>

          <div className="text-center mt-6">
            <button
              type="button"
              className="text-sm hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
              style={{ color: "#7C3AED" }}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Create one"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
