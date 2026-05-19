import { httpClient } from "@/shared/api/httpClients";
import { CreateFamily, dataCreatedFamily, JoinFamily, ReponseDataReport, ReposneGetDataReport, ResponseFamilyGrpup, ResponseGetData, ResponseGetDataCategories } from "../domain/IMembersRepository";
import { MemberRepository } from "../domain/MembersRepository";


export class MemeberApi implements MemberRepository {
    async creteFamily(datas: CreateFamily): Promise<dataCreatedFamily> {
        const { data } = await httpClient.post(`/family`, datas);

        return data;

    }
    async JoinFaimly(datas: JoinFamily): Promise<any> {
        const { data } = await httpClient.post(`/family/join`, datas);
        return data;
    }
    async getFamily(id_family: string): Promise<ResponseGetData> {
        const { data } = await httpClient.get(`/family/${id_family}`);
        return data;
    }

    async getReport(id_family: string): Promise<ReponseDataReport> {
        const { data } = await httpClient.get(`/groups_v2/${id_family}/reports`);
        return data
    }
    async getReportOne(id_family: string): Promise<ReposneGetDataReport> {
        const { data } = await httpClient.get(`/groups/${id_family}/reports`);
        return data
    }
    async getCategories(id_family: string): Promise<ResponseGetDataCategories> {
        const { data } = await httpClient.get(`/family/categories/${id_family}`);
        return data
    }
    async getMemberByFamily(id_family: string): Promise<ResponseFamilyGrpup> {
        const { data } = await httpClient.get(`/family/members/${id_family}`);
        return data
    }
}