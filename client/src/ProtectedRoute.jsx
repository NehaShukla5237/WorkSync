import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    async function verifySession() {
      const token = sessionStorage.getItem("worksyncToken");

      if (!token) {
        if (!cancelled) setStatus("unauthenticated");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          sessionStorage.removeItem("worksyncToken");
          sessionStorage.removeItem("worksyncUser");

          if (!cancelled) setStatus("unauthenticated");
          return;
        }

        const data = await response.json();

        sessionStorage.setItem(
          "worksyncUser",
          JSON.stringify(data.user)
        );

        if (!cancelled) setStatus("authenticated");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    verifySession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return <p style={{ padding: "24px" }}>Checking your session...</p>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (status === "error") {
    return (
      <div style={{ padding: "24px" }}>
        <p>Could not connect to WorkSync server.</p>
        <button onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    );
  }

  return <Outlet />;
}
