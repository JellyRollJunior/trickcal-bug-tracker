import { useBoardOutletContext } from '@/features/boards/context/useBoardOutletContext.ts';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const TicketView = () => {
  const { boardId, ticketId } = useParams();
  const { board } = useBoardOutletContext();
  const navigate = useNavigate();

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

  return (
    <main className="block-primary min-h-0 my-3 mx-2 overflow-y-auto px-3 py-2">
      <header className="mb-4">
        <h2 className="mb-2">{ticket.summary}</h2>
        <p>
          {ticket.issueType} · {ticket.category}
        </p>
      </header>

      <section className="mb-4">
        <h3 className="mb-2">Description</h3>
        <p>{ticket.description}</p>
      </section>

      <section className="mb-4">
        <h3 className="mb-2">Details</h3>
        <dl>
          <div className="mb-2">
            <dt>Priority</dt>
            <dd>{ticket.priority}</dd>
          </div>
          <div className="mb-2">
            <dt>Severity</dt>
            <dd>{ticket.severity}</dd>
          </div>
          <div className="mb-2">
            <dt>Reproducible</dt>
            <dd>{ticket.reproducibility ? 'Yes' : 'No'}</dd>
          </div>
          <div className="mb-2">
            <dt>Reporter</dt>
            <dd>
              {ticket.reporter.name} ({ticket.reporter.role})
            </dd>
          </div>
          <div className="mb-2">
            <dt>Assignee</dt>
            <dd>{ticket.assignee?.name ?? 'Unassigned'}</dd>
          </div>
          <div className="mb-2">
            <dt>Created</dt>
            <dd>{formatDate(ticket.creationDate)}</dd>
          </div>
          <div className="mb-2">
            <dt>Last updated</dt>
            <dd>{formatDate(ticket.lastUpdate)}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
};

export { TicketView };
