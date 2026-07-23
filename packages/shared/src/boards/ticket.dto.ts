import { UserDto } from "../users/user.dto.js";

type TicketDto = {
    id: string;
    sectionId: string;
    order: string;
    issueType: 'BUG' | 'FEATURE_REQUEST' | 'TASK' | 'IMPROVEMENT';
    category: 'SERVER' | 'CLIENT' | 'DATABASE' | 'INFRA' | 'OTHER';
    creationDate: string;
    lastUpdate: string;
    priority: 'LOWEST' | 'LOW' | 'MEDIUM' | 'HIGH' | 'HIGHEST';
    severity: 'TRIVIAL' | 'MINOR' | 'MAJOR' | 'CRITICAL' | 'BLOCKER';
    reproducibility: boolean;
    summary: string;
    description: string;
    reporter: UserDto;
    asignee: UserDto | null;
};

export type { TicketDto };
