// Interface para el estado global de la aplicación

export interface AuthState {
  user: User | null;

  token: string | null;
  expiresAt: string | null;
  isHydrated: boolean;
  memberid: string | null;

  login: (data: {
    user: User;
    token: string;
    expiresAt: string;
    memberid: string | null;
  }) => Promise<void>;

  logout: () => Promise<void>;
  setMemberId: (memberid: string) => Promise<void>;
  hydrate: (
    data: {
      user: User;
      token: string;
      expiresAt: string;
      memberid: string | null;
    } | null,
  ) => void;
}

export interface Credenciales {
  email: string;
  password: string;
}

export interface ResponseLogin {
  token: string;
  expiresAt: string;
  user: User;
  memberid: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export interface ChangePassword {
  token: string;
  password: string;
}

export interface ResponseChangePassword {
  ok: boolean;
  message: string;
  data: null;
}

export interface RequestChangePassword {
  email: string;
}
export interface ResponseRequestChangePassword {
  ok: string;
  message: string;
  data: RequestChangePasswordData;
}
export interface RequestChangePasswordData {
  message: string;
  _dev_token: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface ResponseRegisterUser {
  ok: boolean;
  message: string;
  data: RegisterUserData;
}

export interface RegisterUserData {
  id: string;
  name: string;
  email: string;
}
