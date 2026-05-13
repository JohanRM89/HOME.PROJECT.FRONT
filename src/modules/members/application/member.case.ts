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
}
