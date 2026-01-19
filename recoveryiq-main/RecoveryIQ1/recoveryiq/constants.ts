
import { Case, Agency, User } from './types';

export const MOCK_USER: User = {
  id: 'u-1',
  name: 'Marcus Vane',
  email: 'm.vane@fedex.com',
  role: 'ADMIN',
  avatar: 'https://picsum.photos/seed/marcus/200'
};

export const MOCK_CASES: Case[] = [
  {
    id: 'RE-8829-X',
    customerName: 'Global Logistics Corp',
    accountType: 'B2B Account',
    region: 'North America',
    amountDue: 142500,
    daysOverdue: 114,
    priority: 'CRITICAL',
    status: 'IN_PROGRESS',
    agency: 'Evergreen Collections',
    aiScore: 0.94,
    dueDate: '2023-10-12',
    lastAction: 'Agent assigned'
  },
  {
    id: 'RE-7442-A',
    customerName: 'NextMove Distribution',
    accountType: 'B2B Account',
    region: 'EMEA',
    amountDue: 28420.50,
    daysOverdue: 45,
    priority: 'MEDIUM',
    status: 'OPEN',
    agency: 'Apex Receivables',
    aiScore: 0.72,
    dueDate: '2023-11-20',
    lastAction: 'L1 Reminder Sent'
  },
  {
    id: 'RE-9102-L',
    customerName: 'SwiftShip Express',
    accountType: 'Enterprise',
    region: 'APAC',
    amountDue: 8210,
    daysOverdue: 12,
    priority: 'ROUTINE',
    status: 'IN_PROGRESS',
    agency: 'In-house Team',
    aiScore: 0.45,
    dueDate: '2023-12-15',
    lastAction: 'Phone call attempted'
  },
  {
    id: 'RE-8840-X',
    customerName: 'Titan Construction',
    accountType: 'Commercial',
    region: 'North America',
    amountDue: 210000,
    daysOverdue: 142,
    priority: 'CRITICAL',
    status: 'ESCALATED',
    agency: 'Evergreen Collections',
    aiScore: 0.98,
    dueDate: '2023-09-05',
    lastAction: 'Final demand notice issued'
  }
];

export const MOCK_AGENCIES: Agency[] = [
  { id: 'DCA-001', name: 'Evergreen Collections', region: 'North America', status: 'ACTIVE', activeCases: 1250, performanceScore: 92 },
  { id: 'DCA-002', name: 'Apex Receivables', region: 'EMEA', status: 'ACTIVE', activeCases: 840, performanceScore: 84 },
  { id: 'DCA-003', name: 'SecurePay Recovery', region: 'APAC', status: 'WARNING', activeCases: 312, performanceScore: 45 },
  { id: 'DCA-004', name: 'Nexus Recovery Group', region: 'North America', status: 'INACTIVE', activeCases: 0, performanceScore: 0 },
];
