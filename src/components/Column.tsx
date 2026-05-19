import { useState } from "react";
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
  onUpdateTaskTitle: (taskId: string, newTitle: string) => void;
  onUpdateColumnTitle: (columnId: string, newTitle: string) => void;
}

export function Column({
  column,
  onMoveTask,
  tasks,
  onAddTask,
  onDeleteTask,
  onUpdateTaskTitle,
  onUpdateColumnTitle,
}: ColumnProps) {
  const [title, setTitle] = useState(column.title);
  const [isEditing, setIsEditing] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => {
      onMoveTask(item.id, column.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [column.id, onMoveTask]);

  const handleSave = () => {
    if (title.trim() && title !== column.title) {
      onUpdateColumnTitle(column.id, title.trim());
    } else {
      setTitle(column.title);
    }
    setIsEditing(false);
  };

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
        <div className="flex-1 min-w-0 mr-2">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setTitle(column.title);
                  setIsEditing(false);
                }
              }}
              autoFocus
              className="w-full bg-transparent border-b outline-none font-medium text-lg py-0.5"
              style={{ color: "#FFFFFF", borderColor: "#7C3AED" }}
            />
          ) : (
            <h3
              onClick={() => {
                setTitle(column.title);
                setIsEditing(true);
              }}
              className="cursor-pointer truncate font-medium text-lg hover:text-gray-300 transition-colors"
              style={{ color: "#FFFFFF" }}
            >
              {column.title}
            </h3>
          )}
        </div>
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
        <TaskCard
          key={task.id}
          task={task}
          boardTitle={column.title}
          onDelete={onDeleteTask}
          onUpdateTitle={(newTitle) => onUpdateTaskTitle(task.id, newTitle)}
        />
      ))}
    </div>
  );
}
