export interface Deal {
  id: number;
  title: string;
  amount?: number;
  status: "Lead" | "Contacted" | "Proposal" | "InProgress" | "Won" | "Lost";
  clientId: number;
  closeDate?: string;
  tags?: string[];
  assignedTo?: number;
  createdBy: number;
}
