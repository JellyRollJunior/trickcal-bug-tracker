import { useState, type SubmitEvent } from 'react';
import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useDeleteSection } from '@/features/sections/hooks/useDeleteSection.ts';
import { usePatchSection } from '@/features/sections/hooks/usePatchSection.ts';

const useSectionSettingsDrawer = (
    boardId: BoardDto['id'],
    sectionId: SectionDto['id'],
    closeDrawer: () => void
) => {
    const [newName, setNewName] = useState('');
    const { mutate: deleteSection, isPending: isPendingDeleteSection } =
        useDeleteSection(boardId);
    const { mutate: patchSection, isPending: isPendingPatchSection } =
        usePatchSection(boardId);

    const reset = () => {
        setNewName('');
    };

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

    const handlePatchSection = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        patchSection(
            { sectionId, data: { name: newName } },
            {
                onSuccess: () => {
                    closeDrawer();
                },
            }
        );
    };

    return {
        handleDeleteSection,
        isPendingDeleteSection,
        handlePatchSection,
        isPendingPatchSection,
        newName,
        setNewName,
        reset,
    };
};

export { useSectionSettingsDrawer };
