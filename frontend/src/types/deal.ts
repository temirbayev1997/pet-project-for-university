export interface Deal {
  id: number;
  title: string;
  amount?: number;
  status: "Lead" | "Contacted" | "Proposal" | "Won" | "Lost";
  clientId: number;
  closeDate?: string;
  tags?: string[];
}
