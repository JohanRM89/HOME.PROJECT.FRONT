import { TaskUseCase } from "@/modules/tasks/application/task.usecase";
import { MessageData } from "@/modules/tasks/domain/ITaskRepository";
import { TaskApi } from "@/modules/tasks/infraestructure/task.api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useComentsTask(idTask?: string | null) {
  const useCase = new TaskUseCase(new TaskApi());
  const [comments_task, setTasks] = useState<MessageData[]>();
  const [loading_coment, setLoading] = useState(false);
  const [error_coment, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    if (!idTask) return;

    try {
      setLoading(true);
      setError(null);
      const response = await useCase.getCommentByTasks(idTask);
      setTasks(response);
    } catch (err) {
      setError("No se pudieron cargar las tareas");
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
    comments_task,
    loading_coment,
    error_coment,
    reload: loadTasks,
  };
}
