import close from '@/assets/icons/close_white.svg';
import edit from '@/assets/icons/edit_white.svg';
import trash from '@/assets/icons/trash_white.svg';

import type { BoardDto, TicketDto } from '@trickcal-bug-tracker/shared';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useBoardOutletContext } from '@/features/boards/context/useBoardOutletContext.ts';
import { useTicketView } from '@/features/tickets/components/TicketView/useTicketView.ts';
import { TicketEditView } from '@/features/tickets/components/TicketEditView/TicketEditView.tsx';
import { CautionModal } from '@/common/components/CautionModal.tsx';

const TicketViewContainer = () => {
  const { boardId, ticketId } = useParams();

  if (!boardId || !ticketId) {
    return <div>...loading</div>;
  }

  return <TicketView boardId={boardId} ticketId={ticketId} />;
};

const TicketView = ({
  ticketId,
  boardId,
}: {
  ticketId: TicketDto['id'];
  boardId: BoardDto['id'];
}) => {
  const { board } = useBoardOutletContext();
  const navigate = useNavigate();
  const { handleDeleteTicket, isPendingDeleteTicket } = useTicketView(
    ticketId,
    boardId
  );

  // Edit view
  const [isEditing, setIsEditing] = useState(false);
  const openIsEditing = () => setIsEditing(true);
  const closeIsEditing = () => setIsEditing(false);
  // Delete ticket modal
  const [isDeleteTicketOpen, setIsDeleteTicketOpen] = useState(false);
  const openDeleteTicket = () => setIsDeleteTicketOpen(true);
  const closeDeleteTicket = () => setIsDeleteTicketOpen(false);

  // Get current ticket
  const ticket = board.sections
    .flatMap((section) => section.tickets)
    .find((ticket) => ticket.id === ticketId);

  // Redirect if invalid ticket id
  useEffect(() => {
    if (boardId && ticketId && !ticket) {
      toast.error('Invalid ticket id');
      navigate(`/boards/${boardId}`);
    }
  }, [boardId, ticketId, ticket, navigate]);

  if (!boardId || !ticketId) return <div>...loading</div>;
  if (!ticket) return null;

  const formatDate = (iso: string) => new Date(iso).toLocaleString();
  const allCollaborators = [board.owner, ...board.collaborators];

  return (
    <article className="block-container-primary flex min-h-0 flex-col overflow-y-auto px-1 py-1.5">
      {/* Ticket data */}
      {!isEditing && (
        <>
          {/* Summary & Control Buttons */}
          <div className="flex items-center justify-end gap-2 px-1.5">
            <button
              className="button-image-caution rounded-full"
              onClick={openDeleteTicket}
              disabled={isPendingDeleteTicket}
            >
              <img src={trash} />
            </button>
            <button
              className="button-image rounded-full"
              onClick={openIsEditing}
            >
              <img src={edit} />
            </button>

            <Link
              className="button-image rounded-full"
              to={`/boards/${boardId}`}
            >
              <img src={close} />
            </Link>
          </div>

          <main className="block-primary mt-1.5 flex-1 px-4 py-3">
            {/* Summary */}
            <header>
              <h2 className="text-xl font-bold">{ticket.summary}</h2>
              <dd>
                <span className="block-primary-label-secondary">
                  {ticket.issueType}
                </span>
                <span className="block-primary-label ml-1">
                  {ticket.category}
                </span>
              </dd>
            </header>

            {/* Description */}
            <section className="mt-4">
              <dt className="mt-2 font-bold">Description</dt>
              <dd>{ticket.description}</dd>
            </section>

            {/* Classification & Metadata */}
            <section className="mt-4">
              <dl>
                <div className="grid grid-cols-3">
                  <div className="mt-2">
                    <dt className="font-bold">Priority</dt>
                    <dd>{ticket.priority}</dd>
                  </div>
                  <div className="mt-2">
                    <dt className="font-bold">Severity</dt>
                    <dd>{ticket.severity}</dd>
                  </div>
                  <div className="mt-2">
                    <dt className="font-bold">Reproducible</dt>
                    <dd>{ticket.reproducibility ? 'Yes' : 'No'}</dd>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="mt-2">
                    <dt className="font-bold">Reporter</dt>
                    <dd>
                      {ticket.reporter.name} ({ticket.reporter.role})
                    </dd>
                  </div>
                  <div className="mt-2">
                    <dt className="font-bold">Assignee</dt>
                    <dd>{ticket.assignee?.name ?? 'Unassigned'}</dd>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="mt-2">
                    <dt className="font-bold">Created</dt>
                    <dd>{formatDate(ticket.creationDate)}</dd>
                  </div>
                  <div className="mt-2">
                    <dt className="font-bold">Last updated</dt>
                    <dd>{formatDate(ticket.lastUpdate)}</dd>
                  </div>
                </div>
              </dl>
            </section>
          </main>

          <CautionModal
            open={isDeleteTicketOpen}
            closeModal={closeDeleteTicket}
            onSubmit={handleDeleteTicket}
            isSubmitDisabled={isPendingDeleteTicket}
            title="Remove Ticket"
            message="Are you sure you want to remove ticket?"
            submitActionLabel="Remove ticket"
          />
        </>
      )}

      {/* Edit ticket page */}
      {isEditing && (
        <>
          <Link
            className="button-image ml-auto w-fit rounded-full"
            to={`/boards/${boardId}`}
          >
            <img src={close} />
          </Link>
          <TicketEditView
            ticket={ticket}
            boardId={boardId}
            collaborators={allCollaborators}
            closeEditView={closeIsEditing}
          />
        </>
      )}
    </article>
  );
};

export { TicketViewContainer as TicketView };
