import { httpClient } from "@/shared/api/httpClients";
import { CreateFamily, JoinFamily, ReponseDataReport, ReposneGetDataReport, ResponseGetData } from "../domain/IMembersRepository";
import { MemberRepository } from "../domain/MembersRepository";


export class MemeberApi implements MemberRepository {
    creteFamily(data: CreateFamily): Promise<any> {
        throw new Error("Method not implemented.");
    }
    JoinFaimly(data: JoinFamily): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getFamily(id_family: string): Promise<ResponseGetData> {
        const { data } = await httpClient.get(`/family/${id_family}`);
        return data;
    }
    
    async getReport(id_family: string): Promise<ReponseDataReport> {
        const {data} = await httpClient.get(`/groups_v2/${id_family}/reports`);
        return data
    }
    async getReportOne(id_family: string): Promise<ReposneGetDataReport> {
        const {data} = await httpClient.get(`/groups/${id_family}/reports`);
        return data
    }
}