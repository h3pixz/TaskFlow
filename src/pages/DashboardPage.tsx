import { useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
    }
  }, [userEmail, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#121212" }}>
      <div
        className="fixed left-0 top-0 h-full w-64 border-r p-6"
        style={{ backgroundColor: "#1a1a1a", borderColor: "#2a2a2a" }}
      >
        <h2 className="mb-8 text-xl" style={{ color: "#FFFFFF" }}>
          TaskFlow
        </h2>

        <div className="space-y-4">
          <button
            className="w-full flex items-center gap-3 px-4 py-2 rounded transition-colors cursor-pointer"
            style={{ color: "#9CA3AF" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2A2A2A";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#9CA3AF";
            }}
          >
            <User size={20} />
            <span>Profile</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded transition-colors cursor-pointer"
            style={{ color: "#9CA3AF" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2A2A2A";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#9CA3AF";
            }}
          >
            <LogOut size={20} />
            <span>LogOut</span>
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-sm" style={{ color: "#6B7280" }}>
              {userEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
