import {
  CreateFamily,
  dataCreatedFamily,
  JoinFamily,
  ReponseDataReport,
  ReposneGetDataReport,
  ResponseFamilyGrpup,
  ResponseGetData,
  ResponseGetDataCategories,
} from "./IMembersRepository";

export interface MemberRepository {
  creteFamily(data: CreateFamily): Promise<dataCreatedFamily>;
  JoinFaimly(data: JoinFamily): Promise<any>;
  getFamily(id_family: string): Promise<ResponseGetData>;
  getReport(id_family: string): Promise<ReponseDataReport>;
  getReportOne(id_family: string): Promise<ReposneGetDataReport>;
  getCategories(id_family: string): Promise<ResponseGetDataCategories>;
  getMemberByFamily(id_family: string): Promise<ResponseFamilyGrpup>;
}
