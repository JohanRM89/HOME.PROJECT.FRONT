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
}
