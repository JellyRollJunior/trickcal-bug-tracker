import z from 'zod';
import { useState } from 'react';
import {
  postTicketsRequestBodySchema,
  type UserDto,
} from '@trickcal-bug-tracker/shared';
import { Modal } from '@/common/components/Modal.tsx';

type TicketPayload = z.infer<typeof postTicketsRequestBodySchema>;

type CreateTicketModalProps = {
  open: boolean;
  closeModal: () => void;
  collaborators: UserDto[];
};
const CreateTicketModal = ({
  open,
  closeModal,
  collaborators,
}: CreateTicketModalProps) => {
  const [summary, setSummary] = useState<TicketPayload['summary']>('');
  const [description, setDescription] = useState<TicketPayload['description']>('');
  const [issueType, setIssueType] = useState<TicketPayload['issueType']>();
  const [category, setCategory] = useState<TicketPayload['category']>();
  const [priority, setPriority] = useState<TicketPayload['priority']>();
  const [severity, setSeverity] = useState<TicketPayload['severity']>();
  const [reproducibility, setReproducibility] = useState<TicketPayload['reproducibility']>(false);
  const [assigneeId, setAssigneeId] = useState<TicketPayload['assigneeId']>(null);

  return (
    <Modal open={open} closeModal={closeModal} title="Create Ticket">
      <form className="mt-2 h-fit w-fit px-3 py-2">
        <textarea
          className="block-primary mt-2 w-full py-1 pr-1 pl-2"
          placeholder="Summary"
          rows={2}
          minLength={1}
          maxLength={200}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          required
        />

        <textarea
          className="block-primary mt-2 w-full py-1 pr-1 pl-2"
          placeholder="Description"
          rows={4}
          minLength={1}
          maxLength={5000}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <div className="mt-2 flex gap-2">
          <select
            className="block-primary py-1 pr-1 pl-2"
            value={issueType}
            onChange={(event) =>
              setIssueType(event.target.value as TicketPayload['issueType'])
            }
            required
          >
            <option value="" disabled selected>
              Issue Type
            </option>
            <option value="BUG">Bug</option>
            <option value="FEATURE_REQUEST">Feature Request</option>
            <option value="TASK">Task</option>
            <option value="IMPROVEMENT">Improvement</option>
          </select>

          <select
            className="block-primary py-1 pr-1 pl-2"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as TicketPayload['category'])
            }
            required
          >
            <option value="" disabled selected>
              Category
            </option>
            <option value="SERVER">Server</option>
            <option value="CLIENT">Client</option>
            <option value="DATABASE">Database</option>
            <option value="INFRA">Infra</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="mt-2 flex gap-2">
          <select
            className="block-primary py-1 pr-1 pl-2"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as TicketPayload['priority'])
            }
            required
          >
            <option value="" disabled selected>
              Priority
            </option>
            <option value="LOWEST">Lowest</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="HIGHEST">Highest</option>
          </select>

          <select
            className="block-primary py-1 pr-1 pl-2"
            value={severity}
            onChange={(event) =>
              setSeverity(event.target.value as TicketPayload['severity'])
            }
            required
          >
            <option value="" disabled selected>
              Severity
            </option>
            <option value="TRIVIAL">Trivial</option>
            <option value="MINOR">Minor</option>
            <option value="MAJOR">Major</option>
            <option value="CRITICAL">Critical</option>
            <option value="BLOCKER">Blocker</option>
          </select>
        </div>

        <label className="mt-2 flex items-center gap-1">
          <input
            type="checkbox"
            checked={reproducibility}
            onChange={(event) => setReproducibility(event.target.checked)}
          />
          Reproducible
        </label>

        <select
          className="block-primary mt-2 w-full py-1 pr-1 pl-2"
          value={assigneeId ?? ''}
          onChange={(event) => setAssigneeId(event.target.value || null)}
        >
          <option value="" selected>Unassigned</option>
          {collaborators.map((collaborator) => (
            <option key={collaborator.id} value={collaborator.id}>
              {collaborator.name}
            </option>
          ))}
        </select>

        <div className="mt-2 flex justify-start gap-1">
          <button
            className="button-primary px-3 py-1 disabled:bg-gray-300"
            //   disabled={isPendingCreateTicket}
          >
            Create
          </button>
          <button
            className="button-primary px-3 py-1 disabled:bg-gray-300"
            type="button"
            onClick={closeModal}
            //   disabled={isPendingCreateTicket}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export { CreateTicketModal };
