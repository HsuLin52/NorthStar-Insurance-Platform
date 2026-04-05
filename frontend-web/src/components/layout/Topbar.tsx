"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      await logout();

      if (window.location.pathname !== "/login") {
        router.replace("/login");
      }
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="topbar">
      <div>
        <h2>Secure Operations Workspace</h2>
        <p>
          {user?.profile.firstName} {user?.profile.lastName}
        </p>
      </div>

      <button
        className="btn btn-secondary"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </header>
  );
}