import { httpClient } from "@/shared/api/httpClients";
import { ResponseDataListaTareas } from "../domain/ITaskRepository";
import { TaskRepository } from "../domain/TaskRepository";

export class TaskApi implements TaskRepository {
  async getTaskByAsig(assignedTo: string): Promise<ResponseDataListaTareas> {
    const { data } = await httpClient.get("/tasks", {
      params: { assignedTo: assignedTo },
    });
    return data;
  }
  async getTaskByGroup(groupId: string): Promise<ResponseDataListaTareas> {
    const { data } = await httpClient.get("/tasks", {
      params: { groupId: groupId },
    });
    return data;
  }
}
