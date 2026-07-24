import { Section, Ticket } from '@prisma/client';
import { NotFoundError } from '@trickcal-bug-tracker/shared';
import { generateKeyBetween } from 'fractional-indexing';

const extractOrder = (
    items: Section[] | Ticket[],
    itemId: Section['id'] | Ticket['id'] | null
) => {
    if (itemId) {
        const previousItem = items.find((items) => items.id === itemId);
        if (!previousItem)
            throw new NotFoundError('Invalid ordering section/ticket id');
        return previousItem.order;
    } else {
        return null;
    }
};

const computeNewOrder = (
    items: Section[] | Ticket[],
    previousItemId: Section['id'] | null,
    nextItemId: Section['id'] | null
) => {
    if (items.length > 0 && previousItemId == null && nextItemId == null) {
        throw new NotFoundError('Invalid ordering section/ticket id');
    }
    const previousOrder = extractOrder(items, previousItemId);
    const nextOrder = extractOrder(items, nextItemId);

    return generateKeyBetween(previousOrder, nextOrder);
};

export { computeNewOrder };
