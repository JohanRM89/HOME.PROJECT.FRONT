import { httpClient } from "@/shared/api/httpClients";
import {
    CreateCommentTask,
    ResponseDataListaTareas,
    ResponseMessageData,
    ResponseTareas,
} from "../domain/ITaskRepository";
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
  async getDetailsTask(groupId: string): Promise<ResponseTareas> {
    const { data } = await httpClient.get(`/tasks/obtenerById/${groupId}`);
    return data;
  }
  async getCommentByTask(task_id: string): Promise<ResponseMessageData> {
    const { data } = await httpClient.get(`/tasks/comments/task/${task_id}`);
    return data;
  }
  async createCommentTask(
    sendData: CreateCommentTask,
  ): Promise<ResponseMessageData> {
    const { data } = await httpClient.post("/tasks/comments", sendData);
    return data;
  }
}
