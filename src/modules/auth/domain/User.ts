export interface Credenciales {
  email: string;
  password: string;
}

export interface ResponseLogin {
  token: string;
  expiresAt: string;
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Interface para el estado global de la aplicación
export interface AuthState {
  user: ResponseLogin | null;
  login: (user: ResponseLogin) => void;
  logout: () => void;
}
