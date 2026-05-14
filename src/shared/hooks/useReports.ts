import { MemberCase } from "@/modules/members/application/member.case";
import { ReponseDataReport } from "@/modules/members/domain/IMembersRepository";
import { MemeberApi } from "@/modules/members/infrastructure/memeber.api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useReports(idTask?: string | null) {
  const useCase = new MemberCase(new MemeberApi());
  const [reports, setReports] = useState<ReponseDataReport>();
  const [loading_reports, setLoading] = useState(false);
  const [error_reports, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    if (!idTask) return;

    try {
      setLoading(true);
      setError(null);
      const response = await useCase.GetReports(idTask);
      setReports(response);
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
    reports,
    loading_reports,
    error_reports,
    reload: loadTasks,
  };
}
