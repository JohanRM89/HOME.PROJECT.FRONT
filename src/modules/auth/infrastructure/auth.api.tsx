//Creación de las conexiones para los end-points para la autenticación

import { httpClient } from "@/shared/api/httpClients";
import { CambiarPassword, EnviarCorreoRecuperarPassword, Login, RegistroUsuario } from "@/shared/ultis/variables";
import { AuthRepository } from "../domain/AuthRepository";
import { RegisterUser, RegisterUserData, RequestChangePasswordData, ResponseLogin } from "../domain/IAuthRepository";

export class AuthApi implements AuthRepository {
  async sentChangePasswordEmail(email: string): Promise<RequestChangePasswordData> {
    const response = await httpClient.post(EnviarCorreoRecuperarPassword, {
      email
    });
    const data = response.data;
    return {
      _dev_token: data.data._dev_token,
      message: data.data.message
    }
  };
  async sentChangePassword(token: string, password: string): Promise<null> {
    await httpClient.post(CambiarPassword, {
      token,
      password
    });
    return null;

  }
  async registerUser(dataSend: RegisterUser): Promise<RegisterUserData> {
    const response = await httpClient.post(RegistroUsuario, {
      ...dataSend
    });
    const data = response.data;
    return {

      id: data.data.id,
      name: data.data.name,
      email: data.data.email,



    }
  };
  async login(email: string, password: string): Promise<ResponseLogin> {
    const response = await httpClient.post(Login, {
      email,
      password,
    });
    const data = response.data;
    return {
      expiresAt: data.data.expiresAt,
      token: data.data.token,
      user: data.data.user,
      memberid:data.data.memberid
    };
  }



}
