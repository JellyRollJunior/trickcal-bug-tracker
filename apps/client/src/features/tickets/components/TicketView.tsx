import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useBoardOutletContext } from '@/features/boards/context/useBoardOutletContext.ts';
import { TicketEditView } from '@/features/tickets/components/TicketEditView/TicketEditView.tsx';

const TicketView = () => {
  const { boardId, ticketId } = useParams();
  const { board } = useBoardOutletContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

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
      {!isEditing && (
        <>
          <div className="ml-auto flex w-fit gap-2">
            <button
              className="button-primary px-3 py-1"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <Link
              className="button-primary ml-auto block px-3 py-1"
              to={`/boards/${boardId}`}
            >
              ×
            </Link>
          </div>
          <header>
            <h2 className="text-xl font-bold">{ticket.summary}</h2>
            <dd>
              {ticket.issueType} · {ticket.category}
            </dd>
          </header>

          <section className="mt-4">
            <dt className="mt-2 font-bold">Description</dt>
            <dd>{ticket.description}</dd>
          </section>

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
        </>
      )}
      {isEditing && (
        <>
          <Link
            className="button-primary ml-auto w-fit block px-3 py-1"
            to={`/boards/${boardId}`}
          >
            ×
          </Link>
          <TicketEditView
            ticket={ticket}
            boardId={boardId}
            collaborators={allCollaborators}
            closeEditView={() => setIsEditing(false)}
          />
        </>
      )}
    </main>
  );
};

export { TicketView };
