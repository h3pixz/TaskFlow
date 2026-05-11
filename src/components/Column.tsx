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

export function Column({ column } : ColumnProps) {
  return (
    <div className="w-80 rounded border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3>{column.title}</h3>
      </div>
    </div>
  );
}
