import { TaskUseCase } from "@/modules/tasks/application/task.usecase";
import { DataListaTareas } from "@/modules/tasks/domain/ITaskRepository";
import { TaskApi } from "@/modules/tasks/infraestructure/task.api";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useCalendarTasks(
  groupId?: string | null,
  selectedDay?: string,
) {
  const useCase = useMemo(() => new TaskUseCase(new TaskApi()), []);

  const [tasks, setTasks] = useState<DataListaTareas[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasksByDay = useCallback(async () => {
    if (!groupId || !selectedDay) {
      setTasks([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await useCase.getCalendarTasksByDay(
        groupId,
        selectedDay,
      );

      setTasks(response.data ?? []);
    } catch (err) {
      setError("No se pudieron cargar las tareas del día");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [groupId, selectedDay, useCase]);

  useEffect(() => {
    loadTasksByDay();
  }, [loadTasksByDay]);

  return {
    tasks,
    loading,
    error,
    reload: loadTasksByDay,
  };
}
