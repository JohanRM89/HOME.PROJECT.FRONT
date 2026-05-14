export interface CreateFamily {
  name: string;
}
export interface JoinFamily {
  codigo: string;
}

export interface ResponseGetData {
  ok: boolean;
  message: string;
  data: resetGetData;
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

export interface ReponseDataReport {
  ok: boolean;
  message: string;
  data: {
    summary: SumaryInterface;
    users: UserReports[];
    report: ReportI;
  };
}
export interface SumaryInterface {
  total: number;
  completed: number;
  pending: number;
  in_progress: number;
  complianceRate: number;
}

export interface UserReports {
  id: string;
  name: string;
  completed: number;
  total: number;
  percent: number;
}

export interface ReportI {
  id: string;
  group_id: string;
  period_start: string;
  period_end: string;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  in_progress_tasks: number;
  compliance_rate: string;
  generated_at: string;
}

export interface ReposneGetDataReport {
  ok: boolean;
  message: string;
  data: CuantData[];
}

export interface CuantData {
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  in_progress_tasks: number;
}
