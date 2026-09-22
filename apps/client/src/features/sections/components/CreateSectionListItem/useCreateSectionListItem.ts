import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useState, type SubmitEvent } from 'react';
import { useCreateSection } from '@/features/sections/hooks/useCreateSection.tsx';

const useCreateSectionListItem = (
    boardId: BoardDto['id'],
    insertAfterSectionId: SectionDto['id']
) => {
    const { mutate: createSection, isPending: isPendingCreateSection } =
        useCreateSection(boardId);
    const [sectionName, setSectionName] = useState('');

    const reset = () => setSectionName('')

    const handleCreateSection = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        createSection({
            boardId,
            data: {
                name: sectionName,
                previousSectionId: insertAfterSectionId ?? '',
            },
        });
    };

    return {
        handleCreateSection,
        isPendingCreateSection,
        sectionName,
        setSectionName,
        reset,
    };
};

export { useCreateSectionListItem };
