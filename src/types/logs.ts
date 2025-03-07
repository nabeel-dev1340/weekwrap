export interface Log {
  id: string;
  user_id: string;
  title: string;
  content: string;
  images: string[];
  log_date: string;
  created_at: string;
  updated_at: string | null;
}

export interface LogEditorProps {
  onSave: (content: string, title: string, images: File[]) => Promise<void>;
  onCancel: () => void;
  date: Date;
  onDateChange: (date: Date) => void;
  initialTitle?: string;
  initialContent?: string;
}

export interface LogsListProps {
  logs: Log[];
  viewMode: "list" | "grid";
  onDelete: (logId: string) => Promise<void>;
  onEdit: (log: Log) => void;
  onDeleteClick: (log: Log) => void;
}

export interface EmptyStateProps {
  onCreateLog: () => void;
}
