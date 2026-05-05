import { useState } from "react";
import { loginUser } from "./services/authService";

function NalvelLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // ✅ backend controls redirect
      window.location.href = `${data.redirectUrl}?token=${data.token}`;

    } catch (err) {
      console.error(err);
      alert(err.message || "Login failed");
    }
  }

  return (
    <div className="page">
      <header className="brand">
       <img className="brand-logo" src="/Logo.svg" alt="Nalvel Logo" />
      </header>

      <main>
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Welcome back</h1>
            <p className="card-subtitle">
              Sign in to continue
            </p>
          </div>

          <form className="form" onSubmit={handleLogin}>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">
              Sign In →
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}