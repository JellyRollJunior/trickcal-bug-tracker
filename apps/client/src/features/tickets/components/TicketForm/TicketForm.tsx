import type { z } from 'zod';
import type {
  postTicketsRequestBodySchema,
  UserDto,
} from '@trickcal-bug-tracker/shared';
import type { SubmitEvent } from 'react';
import type { useTicketFormStates } from '@/features/tickets/components/TicketForm/useTicketFormStates.ts';

type TicketPayload = z.infer<typeof postTicketsRequestBodySchema>;

type TicketForm = {
  ticketFormStates: ReturnType<typeof useTicketFormStates>;
  collaborators: UserDto[];
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isDisabled: boolean;
  isRequired?: boolean;
  submitButtonText?: string;
};
const TicketForm = ({
  ticketFormStates,
  collaborators,
  onSubmit,
  onCancel,
  isDisabled,
  isRequired = true,
  submitButtonText = 'create',
}: TicketForm) => {
  const {
    summary,
    setSummary,
    description,
    setDescription,
    issueType,
    setIssueType,
    category,
    setCategory,
    priority,
    setPriority,
    severity,
    setSeverity,
    reproducibility,
    setReproducibility,
    assigneeId,
    setAssigneeId,
  } = ticketFormStates;

  return (
    <form
      className="block-primary mt-2 h-fit w-full px-3 py-2"
      onSubmit={onSubmit}
    >
      <textarea
        className="input mt-2"
        placeholder="Summary"
        rows={2}
        minLength={1}
        maxLength={200}
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
        required={isRequired}
      />

      <textarea
        className="input mt-2"
        placeholder="Description"
        rows={4}
        minLength={1}
        maxLength={5000}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required={isRequired}
      />

      <div className="mt-2 flex gap-2">
        <select
          className="input"
          value={issueType}
          onChange={(event) =>
            setIssueType(event.target.value as TicketPayload['issueType'])
          }
          required={isRequired}
        >
          <option value="" disabled>
            Issue Type
          </option>
          <option value="BUG">Bug</option>
          <option value="FEATURE_REQUEST">Feature Request</option>
          <option value="TASK">Task</option>
          <option value="IMPROVEMENT">Improvement</option>
        </select>

        <select
          className="input"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as TicketPayload['category'])
          }
          required={isRequired}
        >
          <option value="" disabled>
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
          className="input"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as TicketPayload['priority'])
          }
          required={isRequired}
        >
          <option value="" disabled>
            Priority
          </option>
          <option value="LOWEST">Lowest</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="HIGHEST">Highest</option>
        </select>

        <select
          className="input"
          value={severity}
          onChange={(event) =>
            setSeverity(event.target.value as TicketPayload['severity'])
          }
          required={isRequired}
        >
          <option value="" disabled>
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
        className="input mt-2"
        value={assigneeId ?? ''}
        onChange={(event) => setAssigneeId(event.target.value || null)}
      >
        <option value="">Unassigned</option>
        {collaborators.map((collaborator) => (
          <option key={collaborator.id} value={collaborator.id}>
            {collaborator.name}
          </option>
        ))}
      </select>

      <div className="mx-1 my-1 mt-4 flex justify-end gap-3">
        <button
          className="button-back"
          type="button"
          onClick={onCancel}
          disabled={isDisabled}
        >
          Cancel
        </button>
        <button className="button-confirm" disabled={isDisabled}>
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export { TicketForm };
