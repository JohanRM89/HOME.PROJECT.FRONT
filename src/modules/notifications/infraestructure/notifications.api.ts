import { httpClient } from "@/shared/api/httpClients";
import { GetNotifications } from "../domain/INotificationsRepository";
import { NotificationsRepository } from "../domain/NotificationsRepository";

export class NotificationsApi implements NotificationsRepository {
  async getNotifications(groupId: string): Promise<GetNotifications> {
    const { data } = await httpClient.get(`/notifications/member/${groupId}`);
    return data;
  }
}
