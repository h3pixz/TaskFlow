import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Column } from "../components/Column";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

interface Task {
  id: string;
  title: string;
  columnId: string;
}

interface Board {
  id: string;
  title: string;
}

interface ColumnData {
  id: string;
  title: string;
}

interface BoardData {
  columns: ColumnData[];
  tasks: Task[];
}

export function BoardPage() {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const [userEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColums] = useState<ColumnData[]>([
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ]);

  const boardTitle = () => {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) {
      const boards: Board[] = JSON.parse(savedBoards);
      const currentBoard = boards.find((b) => b.id === boardId);

      return currentBoard ? currentBoard.title : "Board not found!";
    }
  };

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
      return;
    }

    if (boardId) {
    const savedData = localStorage.getItem(`boards-${boardId}`);
    if (savedData) {
      const boardData: BoardData = JSON.parse(savedData);
      setColums(boardData.columns);
      setTasks(boardData.tasks);
    }
  }
  }, [userEmail, navigate, boardId]);

  const addTask = (columnId: string) => {
    const title = prompt("Enter task title...");
    if(!title) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      columnId,
    };

    setTasks([...tasks, newTask])
  }

  return (
    <DndProvider backend={HTML5Backend}>
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

            <h1 className="text-[#9CA3AF]">{boardTitle()}</h1>
          </div>
          <p className="text-sm" style={{ color: "#a0a0a0" }}>
            {userEmail}
          </p>
        </div>

        <div className="p-8 overflow-x-auto">
          <div className="flex gap-6 min-w-max">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter(t => t.columnId === column.id)}
                onAddTask={() => addTask(column.id)}
                onDeleteColumn={() => {}}
                onMoveTask={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
