import { ResponseLogin } from "./User";

export interface AuthRepository {
  login(email: string, password: string): Promise<ResponseLogin>;
}
