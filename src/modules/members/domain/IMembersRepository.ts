export interface CreateFamily {
  name: string;
}
export interface JoinFamily {
  codigo: string;
}

export interface ResponseGetData {
  ok: boolean;
}
export interface resetGetData {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  invitation_code: string;
  miembros: MemebersData[];
}

export interface MemebersData {
  name: string;
  email: string;
  role: string;
  points_accumulated: number;
  joined_at: string;
}
