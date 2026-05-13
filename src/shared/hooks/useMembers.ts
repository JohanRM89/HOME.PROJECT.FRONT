import { MemberCase } from "@/modules/members/application/member.case";
import { ResponseGetData } from "@/modules/members/domain/IMembersRepository";
import { MemeberApi } from "@/modules/members/infrastructure/memeber.api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useMembers(idTask?: string | null) {
  const useCase = new MemberCase(new MemeberApi());
  const [members, setTasks] = useState<ResponseGetData>();
  const [loading_members, setLoading] = useState(false);
  const [error_members, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    if (!idTask) return;

    try {
      setLoading(true);
      setError(null);
      const response = await useCase.getMembers(idTask);
      setTasks(response);
    } catch (err) {
      setError("No se pudieron cargar la familia");
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
    members,
    loading_members,
    error_members,
    reload: loadTasks,
  };
}
