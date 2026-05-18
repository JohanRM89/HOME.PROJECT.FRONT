import { CreateCommentTask } from "../domain/ITaskRepository";
import { TaskRepository } from "../domain/TaskRepository";

export class TaskUseCase {
  constructor(private repository: TaskRepository) {}

  async getTaskAsig(assignedTo: string) {
    try {
      const list = await this.repository.getTaskByAsig(assignedTo);
      return list.data;
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar sus tareas";

      throw new Error(apiMessage);
    }
  }

  async getTaskGroup(groupId: string) {
    try {
      const list = await this.repository.getTaskByGroup(groupId);
      return list.data;
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar las tareas de la familia";

      throw new Error(apiMessage);
    }
  }
  async getTaskDetail(idTask: string) {
    try {
      const list = await this.repository.getDetailsTask(idTask);
      return list.data;
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar las tareas de la familia";

      throw new Error(apiMessage);
    }
  }
  async getCommentByTasks(idTask: string) {
    try {
      const list = await this.repository.getCommentByTask(idTask);
      return list.data;
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar comnetarios  de la tarea";

      throw new Error(apiMessage);
    }
  }
  async createCommentTasks(data: CreateCommentTask) {
    try {
      return await this.repository.createCommentTask(data);
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "No se puede crear la tarea";

      throw new Error(apiMessage);
    }
  }
  async getCalendarTasksByDay(groupId: string, selectedDay: string) {
    return this.repository.getCalendarTasksByDay(groupId, selectedDay);
  }
}
