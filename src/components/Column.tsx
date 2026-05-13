import { Plus, Trash2 } from "lucide-react";
import { useDrop } from "react-dnd";

interface Task {
  id: string;
  title: string;
  columnId: string;
}

interface ColumnData {
  id: string;
  title: string;
}

interface ColumnProps {
  column: ColumnData;
  tasks: Task[];
  onAddTask: () => void;
  onDeleteColumn: () => void;
  onMoveTask: (taskId: string, columnId: string) => void;
}

export function Column({ column, onMoveTask }: ColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => {
      onMoveTask(item.id, column.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="w-80 rounded border p-4"
      style={{
        backgroundColor: isOver ? "#252525" : "#1A1A1A",
        borderColor: isOver ? "#7C3AED" : "#2A2A2A",
        transition: "all 0.2s",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ color: "#FFFFFF" }}>{column.title}</h3>
        <div className="flex items-center gap-2">
          <button
            className="transition-colors cursor-pointer"
            style={{ color: "#7C3AED" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#6D28D9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#7C3AED";
            }}
          >
            <Plus size={20} />
          </button>
          <button
            className="transition-colors cursor-pointer"
            style={{ color: "#6B7280" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#EF4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B7280";
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
