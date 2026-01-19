
export type UserRole = 'ADMIN' | 'MANAGER' | 'DCA';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Case {
  id: string;
  customerName: string;
  accountType: string;
  region: string;
  amountDue: number;
  daysOverdue: number;
  priority: 'CRITICAL' | 'MEDIUM' | 'ROUTINE';
  status: 'OPEN' | 'IN_PROGRESS' | 'SETTLED' | 'ESCALATED' | 'PAID';
  agency?: string;
  aiScore: number;
  dueDate: string;
  lastAction?: string;
}

export interface Agency {
  id: string;
  name: string;
  region: string;
  status: 'ACTIVE' | 'WARNING' | 'INACTIVE';
  activeCases: number;
  performanceScore: number;
}
