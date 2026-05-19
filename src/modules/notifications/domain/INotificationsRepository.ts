export interface GetNotifications {
  ok: boolean;
  message: string;
  data: NotificationsData[];
}

export interface NotificationsData {
  id: string;
  user_id: string;
  task_id: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  group_id: string;
  task_title: string;
  actor_name: string;
  category: string;
}
