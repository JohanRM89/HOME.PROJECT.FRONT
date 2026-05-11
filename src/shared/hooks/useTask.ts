import { TaskUseCase } from "@/modules/tasks/application/task.usecase";
import { DataListaTareas } from "@/modules/tasks/domain/ITaskRepository";
import { TaskApi } from "@/modules/tasks/infraestructure/task.api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useTasks(assignedTo?: string) {
  const useCase = new TaskUseCase(new TaskApi());

  const [tasks, setTasks] = useState<DataListaTareas[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    if (!assignedTo) return;

    try {
      setLoading(true);
      setError(null);
      const response = await useCase.getTaskAsig(assignedTo);
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
    tasks,
    loading,
    error,
    reload: loadTasks,
  };
}
