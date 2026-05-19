import { NotificationsRepository } from "../domain/NotificationsRepository";

export class NotificationCase {
  constructor(private repository: NotificationsRepository) {}

  async getNotifications(idFamily: string) {
    try {
      const list = await this.repository.getNotifications(idFamily);
      return list;
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar las notificaciones";

      throw new Error(apiMessage);
    }
  }
}
