import { GetNotifications } from "./INotificationsRepository";

export interface NotificationsRepository {
  getNotifications(groupId: string): Promise<GetNotifications>;
}
