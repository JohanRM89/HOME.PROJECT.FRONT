import { TaskUseCase } from "@/modules/tasks/application/task.usecase";
import { DataListaTareas } from "@/modules/tasks/domain/ITaskRepository";
import { TaskApi } from "@/modules/tasks/infraestructure/task.api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useDetailsTasks(idTask?: string | null) {
  const useCase = new TaskUseCase(new TaskApi());
  const [task_details, setTasks] = useState<DataListaTareas>();
  const [loading_group, setLoading] = useState(false);
  const [error_group, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    if (!idTask) return;

    try {
      setLoading(true);
      setError(null);
      const response = await useCase.getTaskDetail(idTask);
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
    task_details,
    loading_group,
    error_group,
    reload: loadTasks,
  };
}
