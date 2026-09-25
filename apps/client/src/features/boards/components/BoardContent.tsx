import type {
  BoardWithSectionsAndTicketsDto,
  SectionDto,
} from '@trickcal-bug-tracker/shared';
import { Section } from '@/features/sections/components/Section';
import { CreateSectionListItem } from '@/features/sections/components/CreateSectionListItem/CreateSectionListItem';

type BoardContentProps = {
  board: BoardWithSectionsAndTicketsDto;
  openCreateTicket: (id: SectionDto['id']) => void;
  openSectionSettings: (id: SectionDto['id'], name: SectionDto['name']) => void;
};
const BoardContent = ({
  board,
  openCreateTicket,
  openSectionSettings,
}: BoardContentProps) => {
  // Create Section List Item
  const lastSectionId = board?.sections.at(-1)?.id ?? '';

  return (
    <main>
      {/* Section List */}
      <ol className="flex flex-1 gap-3 overflow-x-auto">
        {board.sections.map((section) => (
          <Section
            openCreateTicketModal={() => openCreateTicket(section.id)}
            openSectionSettings={() =>
              openSectionSettings(section.id, section.name)
            }
            key={section.id}
            section={section}
          />
        ))}

        {/* Create Section */}
        <CreateSectionListItem
          boardId={board.id}
          insertAfterSectionId={lastSectionId}
        />
      </ol>
    </main>
  );
};

export { BoardContent };
