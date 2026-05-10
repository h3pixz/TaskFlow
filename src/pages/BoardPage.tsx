import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function BoardPage() {
  const navigate = useNavigate();
  const [userEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [boardTitle] = useState(() => localStorage.getItem("boardTitle") || "");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      navigate("/");
      return;
    }
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#121212" }}>
      <div
        className="px-8 py-4 border-b flex items-center justify-between"
        style={{ borderColor: "#2a2a2a" }}
      >
        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer transition-colors"
            style={{ color: "#9CA3AF" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#9CA3AF";
            }}
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={24} />
          </button>

          {isEditingTitle ? (
            <h1>lol</h1>
          ) : (
            <h1>{boardTitle}</h1>
          )}

        </div>
        <p className="text-sm" style={{ color: "#a0a0a0" }}>{userEmail}</p>
      </div>
    </div>
  );
}
