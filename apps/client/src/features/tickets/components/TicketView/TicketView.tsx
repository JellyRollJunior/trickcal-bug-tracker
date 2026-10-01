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
    <main className="block-primary mx-2 my-3 min-h-0 overflow-y-auto px-3 py-2">
      {/* Ticket data */}
      {!isEditing && (
        <>
          {/* Control Buttons */}
          <div className="ml-auto flex w-fit gap-2">
            <button
              className="button-primary px-3 py-1"
              onClick={openIsEditing}
            >
              Edit
            </button>
            <button
              className="button-caution w-fit px-1 py-0.5 text-xs"
              onClick={openDeleteTicket}
              disabled={isPendingDeleteTicket}
            >
              Remove ticket
            </button>
            <Link
              className="button-primary ml-auto block px-3 py-1"
              to={`/boards/${boardId}`}
            >
              ×
            </Link>
          </div>

          {/* Summary */}
          <header>
            <h2 className="text-xl font-bold">{ticket.summary}</h2>
            <dd>
              {ticket.issueType} · {ticket.category}
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
            className="button-primary ml-auto block w-fit px-3 py-1"
            to={`/boards/${boardId}`}
          >
            ×
          </Link>
          <TicketEditView
            ticket={ticket}
            boardId={boardId}
            collaborators={allCollaborators}
            closeEditView={closeIsEditing}
          />
        </>
      )}
    </main>
  );
};

export { TicketViewContainer as TicketView };
