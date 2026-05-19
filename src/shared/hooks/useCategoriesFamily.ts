import { MemberCase } from "@/modules/members/application/member.case";
import { ResponseGetDataCategories } from "@/modules/members/domain/IMembersRepository";
import { MemeberApi } from "@/modules/members/infrastructure/memeber.api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useCategoriesFamily(idTask?: string | null) {
  const useCase = new MemberCase(new MemeberApi());
  const [categories, setTasks] = useState<ResponseGetDataCategories>();
  const [loading_categories, setLoading] = useState(false);
  const [error_categories, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    if (!idTask) return;

    try {
      setLoading(true);
      setError(null);
      const response = await useCase.GetCategories(idTask);
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
    categories,
    loading_categories,
    error_categories,
    reload: loadTasks,
  };
}
