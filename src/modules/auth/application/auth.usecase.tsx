import { AuthRepository } from "../domain/AuthRepository";
import { RegisterUser } from "../domain/IAuthRepository";

export class AuthUseCase {
  constructor(private repository: AuthRepository) { }
  //Login
  async execute(email: string, password: string) {
    try {
      return await this.repository.login(email, password);
    } catch (error: any) {

      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al iniciar sesión";

      throw new Error(apiMessage);

    }
  }
  //crear usuario 
  async createUser(data: RegisterUser) {
    try {
      return await this.repository.registerUser(data);

    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al crear el usuario";

      throw new Error(apiMessage);
    }
  }
  //enviar token de cambio de contraseña 
  async sendEmailRestorePass(email: string) {
    try {
      return await this.repository.sentChangePasswordEmail(email);
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "No se puede enviar el correo";

      throw new Error(apiMessage);
    }
  }
  async changeRestorePassword(token: string, password: string) {
    try {
      return await this.repository.sentChangePassword(token,password);
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Ya contraseña no fue cambiada";

      throw new Error(apiMessage);
    }
  }
}
