import { ResponseDataListaTareas } from "./ITaskRepository";

export interface TaskRepository {
  getTaskByAsig(assignedTo: string): Promise<ResponseDataListaTareas>;
  getTaskByGroup(groupId: string): Promise<ResponseDataListaTareas>;
}
