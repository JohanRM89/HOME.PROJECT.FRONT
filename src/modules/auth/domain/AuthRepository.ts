import {
  RegisterUser,
  RegisterUserData,
  RequestChangePasswordData,
  ResponseLogin
} from "./IAuthRepository";

export interface AuthRepository {
  login(email: string, password: string): Promise<ResponseLogin>;
  sentChangePasswordEmail(email: string): Promise<RequestChangePasswordData>;
  sentChangePassword(token: string, password: string): Promise<null>;
  registerUser(data: RegisterUser): Promise<RegisterUserData>;
}
