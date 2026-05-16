import { Plus } from "lucide-react";
import { useDrop } from "react-dnd";
import { TaskCard } from "./TaskCard";

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
  onMoveTask: (taskId: string, columnId: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Column({
  column,
  onMoveTask,
  tasks,
  onAddTask,
  onDeleteTask,
}: ColumnProps) {
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
      ref={(node) => {
        drop(node);
      }}
      className="w-80 rounded border p-4 space-y-2"
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
            onClick={onAddTask}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
      ))}
    </div>
  );
}
