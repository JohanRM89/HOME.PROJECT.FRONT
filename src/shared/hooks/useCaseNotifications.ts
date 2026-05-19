import { NotificationCase } from "@/modules/notifications/application/notificacions.case";
import { GetNotifications } from "@/modules/notifications/domain/INotificationsRepository";
import { NotificationsApi } from "@/modules/notifications/infraestructure/notifications.api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useCaseNotifications(idTask?: string | null) {
  const useCase = new NotificationCase(new NotificationsApi());
  const [notificacions, setTasks] = useState<GetNotifications>();
  const [loading_notificacions, setLoading] = useState(false);
  const [error_notificacions, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    if (!idTask) return;

    try {
      setLoading(true);
      setError(null);
      const response = await useCase.getNotifications(idTask);
      setTasks(response);
    } catch (err) {
      setError("No se pudieron cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [idTask]),
  );

  return {
    notificacions,
    error_notificacions,
    loading_notificacions,
    reload: loadTasks,
  };
}
