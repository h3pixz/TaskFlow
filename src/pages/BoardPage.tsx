import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Board {
  id: string;
  title: string;
}

export function BoardPage() {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const [userEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [boardTitle, setBoardTitle] = useState('');

  useEffect(() => {
    if(!userEmail) {
      navigate('/');
      return;
    }

    const savedBoards = localStorage.getItem("boards");
    if(savedBoards) {
      const boards: Board[] = JSON.parse(savedBoards);
      const currentBoard = boards.find((b) => b.id === boardId);

      if(currentBoard) {
        setBoardTitle(currentBoard.title);
      } else {
        setBoardTitle("Board not find!");
      }
    }
  }, [boardId, navigate, userEmail]);

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

          <h1 className="text-[#9CA3AF]">{boardTitle}</h1>

        </div>
        <p className="text-sm" style={{ color: "#a0a0a0" }}>{userEmail}</p>
      </div>
    </div>
  );
}
