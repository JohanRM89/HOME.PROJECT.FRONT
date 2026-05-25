import {
  CreateCommentTask,
  ISendDataTask,
  ResponseDataCalendarTask,
  ResponseDataCreateTask,
  ResponseDataListaTareas,
  ResponseMessageData,
  ResponseTareas,
} from "./ITaskRepository";

export interface TaskRepository {
  getTaskByAsig(assignedTo: string): Promise<ResponseDataListaTareas>;
  getTaskByGroup(groupId: string): Promise<ResponseDataListaTareas>;
  getDetailsTask(detailsTasks: string): Promise<ResponseTareas>;
  getCommentByTask(idTask: string): Promise<ResponseMessageData>;
  createCommentTask(sendData: CreateCommentTask): Promise<ResponseMessageData>;

  getCalendarTasksByDay(
    groupId: string,
    selectedDay: string,
  ): Promise<ResponseDataCalendarTask>;
  postCreateTask(data: ISendDataTask): Promise<ResponseDataCreateTask>;
}
