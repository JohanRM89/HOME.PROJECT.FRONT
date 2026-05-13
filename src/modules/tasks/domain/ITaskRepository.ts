export interface StatusCardProps {
  title: string;
  count: number;
  color: string;
  icon?: string;
  colorBorder?: string;
  colorText?: string;
}

export const STATUS_COLORS: Record<TaskStatus, string> = {
  Pendiente: "#F2B705",
  "En proceso": "#1E88E5",
  Completado: "#2E7D32",
};

export type TaskStatus = "Pendiente" | "En proceso" | "Completado";

export interface SectionHeaderProps {
  title: string;
  onPress?: () => void;
}
export interface ResponseDataListaTareas {
  data: DataListaTareas[];
  message: string;
  meta: {
    page: number;
    total: number;
    totalPages: number;
  };
}
export interface ResponseTareas {
  data: DataListaTareas;
  message: string;
  ok: boolean;
}
export interface ResponseComments {
  data: DataListaTareas;
  message: string;
  ok: boolean;
}

export interface ResponseMessageData {
  data: MessageData[];
  message: string;
  ok: boolean;
}
export interface MessageData {
  id: string;
  task_id: string;
  user_id: string;
  content: string;
  created_at: string;
}
export interface CreateCommentTask {
  task_id?: string;
  user_id?: string;
  content: string;
}
export interface DataListaTareas {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
  group_id: string;
  created_by: string;
  assigned_to: string;
  completed_at: null;
  created_at: string;
  updated_at: string;
  category_id: string;
  points: number;
  created_by_name: string;
  assigned_to_name: string;
  group_name: string;
}
