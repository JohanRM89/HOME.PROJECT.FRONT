import {
  CreateFamily,
  JoinFamily,
  ReponseDataReport,
  ReposneGetDataReport,
  ResponseGetData,
} from "./IMembersRepository";

export interface MemberRepository {
  creteFamily(data: CreateFamily): Promise<any>;
  JoinFaimly(data: JoinFamily): Promise<any>;
  getFamily(id_family: string): Promise<ResponseGetData>;
  getReport(id_family: string): Promise<ReponseDataReport>;
  getReportOne(id_family: string): Promise<ReposneGetDataReport>;
}
