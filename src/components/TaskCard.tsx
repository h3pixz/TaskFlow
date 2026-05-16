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
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        drag(node);
      }}
      className="p-3 rounded border cursor-move transition-all flex items-center justify-between"
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
      {task.title}
      <button style={{color: '#FF2400'}} className="cursor-pointer" onClick={() => onDelete(task.id)}>
        <Trash2 />
      </button>
    </div>
  );
}
