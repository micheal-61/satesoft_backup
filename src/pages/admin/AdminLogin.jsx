import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// This is a simple login component for the Admin CMS
// Developer Note: For production, integrate with a real auth provider (e.g. JWT, Firebase Auth, Auth0)

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(username, password);
    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message || "Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg p-4">
      <div className="bg-surface shadow-2xl p-8 sm:p-10 w-full max-w-md rounded-3xl border border-border">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl shadow-lg" style={{
            background: "conic-gradient(from 180deg at 50% 50%, #3d9e41 0deg, #7ec583 360deg)"
          }}></div>
          <h4 className="text-3xl font-bold text-text mb-2 tracking-tight">CMS Admin</h4>
          <p className="text-text/50 font-medium">Sign in to manage Satesoft content</p>
        </div>
        
        {error && <div className="mb-4 text-red-500 text-center font-bold">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-text/70 text-sm font-bold tracking-widest uppercase mb-2">Username</label>
            <input 
              type="text" 
              className="w-full px-5 py-4 bg-bg border border-border rounded-xl text-text placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-inner" 
              placeholder="Enter username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-text/70 text-sm font-bold tracking-widest uppercase mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-5 py-4 bg-bg border border-border rounded-xl text-text placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-inner" 
              placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-1 tracking-wider uppercase mt-4">
            Sign In
          </button>
        </form>
        
        <div className="text-center mt-10">
          <Link to="/" className="inline-flex items-center text-text/50 hover:text-primary-600 font-medium transition-colors text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Main Site
          </Link>
        </div>
      </div>
    </div>
  );
}
