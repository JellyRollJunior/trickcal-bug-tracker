import type { BoardWithSectionsAndTicketsDto } from '@trickcal-bug-tracker/shared';
import type { usePresenceTracking } from '@/features/boards/hooks/usePresenceTracking.ts';
import { useOutletContext } from 'react-router-dom';

type BoardOutletContext = {
    board: BoardWithSectionsAndTicketsDto;
    viewerList: ReturnType<typeof usePresenceTracking>['viewerList'];
};

const useBoardOutletContext = () => {
    const context = useOutletContext<BoardOutletContext | undefined>();
    if (!context) {
        throw new Error('useBoardOutletContext must be used within a route rendered under BoardLayout');
    }
    return context;
};

export { useBoardOutletContext };
export type { BoardOutletContext };
