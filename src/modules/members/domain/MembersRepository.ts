import {
    CreateFamily,
    JoinFamily,
    ResponseGetData,
} from "./IMembersRepository";

export interface MemberRepository {
  creteFamily(data: CreateFamily): Promise<any>;
  JoinFaimly(data: JoinFamily): Promise<any>;
  getFamily(id_family: string): Promise<ResponseGetData>;
}
