export interface Reminder {
  id: number;
  title: string;
  description?: string;
  remindAt: string;
  isDone: boolean;
  clientId?: number | null;
  dealId?: number | null;
  createdAt: string;
}