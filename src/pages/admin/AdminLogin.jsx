import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("login");
  const { login, forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    const result = await login(username, password);
    setIsLoading(false);
    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message || "Invalid credentials.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    const result = await forgotPassword(email);
    setIsLoading(false);
    if (result.success) {
      setSuccess("If an account exists, reset instructions have been sent to your email.");
      setView("reset");
    } else {
      setError(result.message || "Failed to process request.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!resetToken) {
      setError("Please enter the reset code.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    const result = await resetPassword(resetToken, newPassword);
    setIsLoading(false);
    if (result.success) {
      setSuccess("Password reset successful! You can now login.");
      setView("login");
      setUsername("");
      setPassword("");
      setEmail("");
      setResetToken("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(result.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg p-4">
      <div className="bg-surface shadow-2xl p-8 sm:p-10 w-full max-w-md rounded-3xl border border-border">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h4 className="text-3xl font-semibold text-text mb-2 tracking-tight">CMS Admin</h4>
          <p className="text-text/50 font-medium">
            {view === "login" && "Sign in to manage Satesoft content"}
            {view === "forgot" && "Enter your email to reset password"}
            {view === "reset" && "Enter your new password"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-center text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-center text-sm font-medium border border-green-100">
            {success}
          </div>
        )}

        {view === "login" && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-text/70 text-sm font-semibold tracking-wide mb-2">Username</label>
              <input
                type="text"
                className="w-full px-5 py-4 bg-bg border border-border rounded-xl text-text placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-text/70 text-sm font-semibold tracking-wide mb-2">Password</label>
              <input
                type="password"
                className="w-full px-5 py-4 bg-bg border border-border rounded-xl text-text placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary-500 focus:ring-primary-500" />
                <span className="text-sm text-text/60">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => { setView("forgot"); setError(""); setSuccess(""); }}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        )}

        {view === "forgot" && (
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div>
              <label className="block text-text/70 text-sm font-semibold tracking-wide mb-2">Recovery Email</label>
              <input
                type="email"
                className="w-full px-5 py-4 bg-bg border border-border rounded-xl text-text placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? "Processing..." : "Send Reset Code"}
            </button>
            <button
              type="button"
              onClick={() => { setView("login"); setError(""); setSuccess(""); }}
              className="w-full py-3 text-text/60 hover:text-text font-medium text-sm transition-colors"
            >
              Back to login
            </button>
          </form>
        )}

        {view === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-text/70 text-sm font-semibold tracking-wide mb-2">Reset Code</label>
              <input
                type="text"
                className="w-full px-5 py-4 bg-bg border border-border rounded-xl text-text placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                placeholder="Enter reset code from email"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-text/70 text-sm font-semibold tracking-wide mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-5 py-4 bg-bg border border-border rounded-xl text-text placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-text/70 text-sm font-semibold tracking-wide mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-5 py-4 bg-bg border border-border rounded-xl text-text placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
            <button
              type="button"
              onClick={() => { setView("login"); setError(""); setSuccess(""); setResetToken(""); }}
              className="w-full py-3 text-text/60 hover:text-text font-medium text-sm transition-colors"
            >
              Back to login
            </button>
          </form>
        )}

        <div className="text-center mt-10">
          <Link
            to="/"
            className="inline-flex items-center text-text/50 hover:text-primary-600 font-medium transition-colors text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Main Site
          </Link>
        </div>
      </div>
    </div>
  );
}
