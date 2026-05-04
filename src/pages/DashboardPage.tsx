import { useEffect, useState } from "react";
import { LogOut, Plus, Trash2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Board {
  id: string;
  title: string;
}

export function DashboardPage() {
  const [boards, setBoards] = useState<Board[]>(() => {
    const saved = localStorage.getItem("boards");
    return saved ? (JSON.parse(saved) as Board[]) : [];
  });
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

  const createBoard = () => {
    const title = prompt("Board name?");
    if (!title) return;

    const newBoard: Board = {
      id: Date.now().toString(),
      title,
    };

    setBoards((prev) => {
      const updated = [...prev, newBoard];
      localStorage.setItem("boards", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteBoards = (id: string) => {
    const updatedBoards = boards.filter((b) => b.id !== id);
    setBoards(updatedBoards);
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
    localStorage.removeItem(`board-${id}`);
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
      <div className="ml-64 p-8">
        <h1 className="mb-8" style={{ color: "#FFFFFF" }}>
          My Boards
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={createBoard}
            className="h-32 rounded border-2 border-dashed flex items-center justify-center gap-2 transition-colors cursor-pointer"
            style={{ borderColor: "#2a2a2a", color: "#7C3AED" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#7C3AED";
              e.currentTarget.style.backgroundColor = "#1E1E1E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2A2A2A";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Plus size={24} />
            <span>Create new board</span>
          </button>

          {boards?.map((board) => (
            <div
              key={board.id}
              className="h-32 rounded border p-4 flex flex-col justify-between cursor-pointer transition-colors group"
              style={{ backgroundColor: "#1E1E1E", borderColor: "#2A2A2A" }}
              onClick={() => navigate(`/board/${board.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7C3AED";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2A2A2A";
              }}
            >
              <h3 style={{ color: "#ffffff" }}>{board.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBoards(board.id);
                }}
                className="self-end opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                style={{ color: "#ef4444" }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
