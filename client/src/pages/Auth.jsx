
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Command, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
async function handleSubmit(event) {
  event.preventDefault();
  setError("");

  if (!isLogin && name.trim().length < 2) {
    setError("Please enter your full name.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  try {
    const endpoint = isLogin ? "login" : "signup";

    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    const response = await fetch(
      "http://localhost:5000/api/auth/" + endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Authentication failed.");
      return;
    }

    sessionStorage.setItem("worksyncToken", data.token);
    sessionStorage.setItem("worksyncUser", JSON.stringify(data.user));
    console.log("Logged-in user data:", data.user);

    navigate("/dashboard");
  } catch (error) {
    setError("Unable to connect to the Backend. Check the Server.");
  }
}


  return (
    <main className="auth-page">
      <header className="auth-nav">
        <Link to="/" className="auth-brand">
          <span className="auth-brand-icon"><Command size={22} /></span>
          <span>Work<span>Sync</span></span>
        </Link>
        <Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to home</Link>
      </header>

      <section className="auth-layout">
        <div className="auth-intro">
          <span className="auth-eyebrow">YOUR TEAM, IN SYNC</span>
          <h1>Good work starts<br />with <span>working together.</span></h1>
          <p>Bring your projects, tasks and conversations into one shared workspace.</p>

          <div className="auth-benefits">
            <div><span>✓</span><p>Keep every project organized</p></div>
            <div><span>✓</span><p>Know what needs to happen next</p></div>
            <div><span>✓</span><p>Stay connected with your team</p></div>
          </div>

          <div className="auth-quote">
            <p>"Great teamwork happens when everyone knows what matters."</p>
            <span>— The WorkSync way</span>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-heading">
            <span className="auth-mini-icon"><LockKeyhole size={20} /></span>
            <h2>{isLogin ? "Welcome back" : "Create your account"}</h2>
            <p>{isLogin ? "Enter your details to access your workspace." : "Get started with your team in a few steps."}</p>
          </div>

          <div className="auth-tabs">
            <button type="button" className={isLogin ? "auth-tab active" : "auth-tab"} onClick={() => { setIsLogin(true); setError(""); }}>
              Log in
            </button>
            <button type="button" className={!isLogin ? "auth-tab active" : "auth-tab"} onClick={() => { setIsLogin(false); setError(""); }}>
              Sign up
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <label>
                Full name
                <span className="auth-input-wrap">
                  <UserRound size={17} />
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" autoComplete="name" required />
                </span>
              </label>
            )}

            <label>
              Email address
              <span className="auth-input-wrap">
                <Mail size={17} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
              </span>
            </label>

            <label>
              Password
              <span className="auth-input-wrap">
                <LockKeyhole size={17} />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" autoComplete={isLogin ? "current-password" : "new-password"} minLength={6} required />
                <button className="auth-eye" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </span>
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-submit">
              {isLogin ? "Log in to WorkSync" : "Create account"}
              <ArrowRight size={17} />
            </button>
          </form>

          <p className="auth-switch">
            {isLogin ? "New to WorkSync?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => { setIsLogin(!isLogin); setError(""); }}>
              {isLogin ? "Create an account" : "Log in"}
            </button>
          </p>

          <p className="auth-demo-note">
            Demo interface · Account verification will be added with the backend.
          </p>
        </div>
      </section>

      <footer className="auth-footer">© 2026 WorkSync · Built for better collaboration</footer>
    </main>
  );
}
