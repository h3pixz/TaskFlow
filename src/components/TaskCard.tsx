import { useState } from "react";
import { useDrag } from "react-dnd";
import { Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  columnId: string;
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdateTitle: (newTitle: string) => void;
}

export function TaskCard({ task, onDelete, onUpdateTitle }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleSave = () => {
    if (title.trim() && title !== task.title) {
      onUpdateTitle(title.trim());
    } else {
      setTitle(task.title);
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={(node) => {
        drag(node);
      }}
      className="p-3 rounded border cursor-move transition-all flex items-center justify-between gap-2"
      style={{
        backgroundColor: "#1E1E1E",
        borderColor: "#2A2A2A",
        opacity: isDragging ? 0.5 : 1,
        color: "#FFFFFF",
      }}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.borderColor = "#7C3AED";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#2A2A2A";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") {
                setTitle(task.title);
                setIsEditing(false);
              }
            }}
            autoFocus
            className="w-full bg-transparent border-b outline-none py-0.5"
            style={{ color: "#FFFFFF", borderColor: "#7C3AED" }}
          />
        ) : (
          <p
            onClick={() => setIsEditing(true)}
            className="cursor-pointer truncate py-0.5"
            style={{ color: "#FFFFFF" }}
          >
            {task.title}
          </p>
        )}
      </div>

      <button
        style={{ color: "#FF2400" }}
        className="cursor-pointer flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
