import { CreateFamily, JoinFamily } from "../domain/IMembersRepository";
import { MemberRepository } from "../domain/MembersRepository";

export class MemberCase {
  constructor(private repository: MemberRepository) {}

  async getMembers(idFamily: string) {
    try {
      const list = await this.repository.getFamily(idFamily);
      return list;
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar las tareas de la familia";

      throw new Error(apiMessage);
    }
  }

  async GetReports(idFamily: string) {
    try {
      const list = await this.repository.getReport(idFamily);
      return list;
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar las tareas de la familia";

      throw new Error(apiMessage);
    }
  }
  async GetReportsOne(idFamily: string) {
    try {
      const list = await this.repository.getReportOne(idFamily);
      return list;
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar las tareas de la familia";

      throw new Error(apiMessage);
    }
  }
  async CreateFamily(data: CreateFamily) {
    try {
      return await this.repository.creteFamily(data);
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar las tareas de la familia";

      throw new Error(apiMessage);
    }
  }
  async JoinFamily(data: JoinFamily) {
    try {
      return await this.repository.JoinFaimly(data);
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar las tareas de la familia";
      throw new Error(apiMessage);
    }
  }
  async GetMemberByFamily(idFamily: string) {
    try {
      const list = await this.repository.getMemberByFamily(idFamily);
      return list;
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar las tareas de la familia";

      throw new Error(apiMessage);
    }
  }
  async GetCategories(idFamily: string) {
    try {
      const list = await this.repository.getCategories(idFamily);
      return list;
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al cargar las tareas de la familia";
      throw new Error(apiMessage);
    }
  }
}
