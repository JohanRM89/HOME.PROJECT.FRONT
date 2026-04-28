//Creación de las conexiones para los end-points para la autenticación

import { httpClient } from "@/shared/api/httpClients";
import { AuthRepository } from "../domain/AuthRepository";
import { ResponseLogin } from "../domain/User";

export class AuthApi implements AuthRepository {
  async login(email: string, password: string): Promise<ResponseLogin> {
    const { data } = await httpClient.post("", {
      email,
      password,
    });
    return {
      expiresAt: data.expiresAt,
      token: data.token,
      user: data.user,
    };
  }
}
