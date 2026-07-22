type TicketDto = {
    id: string;
    order: string;
    sectionId: string;
    issueType: 'BUG' | 'FEATURE_REQUEST' | 'TASK' | 'IMPROVEMENT';
    category: 'SERVER' | 'CLIENT' | 'DATABASE' | 'INFRA' | 'OTHER';
    creationDate: string;
    lastUpdate: string;
    reporterId: string;
    assignedTo: string | null;
    priority: 'LOWEST' | 'LOW' | 'MEDIUM' | 'HIGH' | 'HIGHEST';
    severity: 'TRIVIAL' | 'MINOR' | 'MAJOR' | 'CRITICAL' | 'BLOCKER';
    reproducibility: boolean;
    summary: string;
    description: string;
};

export type { TicketDto };
