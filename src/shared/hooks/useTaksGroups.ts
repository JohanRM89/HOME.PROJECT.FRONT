import { TaskUseCase } from "@/modules/tasks/application/task.usecase";
import { DataListaTareas } from "@/modules/tasks/domain/ITaskRepository";
import { TaskApi } from "@/modules/tasks/infraestructure/task.api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useTasksGroups(assignedTo?: string | null) {
  const useCase = new TaskUseCase(new TaskApi());
  const [tasks_group, setTasks] = useState<DataListaTareas[]>([]);
  const [loading_group, setLoading] = useState(false);
  const [error_group, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    if (!assignedTo) return;

    try {
      setLoading(true);
      setError(null);
      const response = await useCase.getTaskGroup(assignedTo);
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
    }, [assignedTo]),
  );

  return {
    tasks_group,
    loading_group,
    error_group,
    reload: loadTasks,
  };
}
