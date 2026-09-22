import type { SubmitEvent } from 'react';
import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useDeleteSection } from '@/features/sections/hooks/useDeleteSection.ts';

const useSectionSettingsDrawer = (
    boardId: BoardDto['id'],
    sectionId: SectionDto['id'],
    closeDrawer: () => void
) => {
    const { mutate: deleteSection, isPending: isPendingDeleteSection } =
        useDeleteSection(boardId);

    const handleDeleteSection = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        deleteSection(
            { sectionId },
            {
                onSuccess: () => {
                    closeDrawer();
                },
            }
        );
    };

    return { handleDeleteSection, isPendingDeleteSection };
};

export { useSectionSettingsDrawer }