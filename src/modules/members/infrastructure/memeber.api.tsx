import { httpClient } from "@/shared/api/httpClients";
import { CreateFamily, JoinFamily, ResponseGetData } from "../domain/IMembersRepository";
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

}