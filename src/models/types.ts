export type Status = 'offen' | 'in Bearbeitung' | 'erledigt';

export interface Todo {
  id: string;
  title: string;
  status: Status;
  description?: string;
  created_at: string;
}