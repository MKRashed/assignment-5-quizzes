import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="text-xl">Welcome</div>
      <button
        className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}
