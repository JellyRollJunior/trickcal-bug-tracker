import { NotFoundError } from '@trickcal-bug-tracker/shared';
import { generateKeyBetween } from 'fractional-indexing';

type Orderable = {
    id: string;
    order: string;
};

const extractOrder = (items: Orderable[], itemId: string | null) => {
    if (itemId) {
        const previousItem = items.find((items) => items.id === itemId);
        if (!previousItem) throw new NotFoundError('Invalid ordering id');
        return previousItem.order;
    } else {
        return null;
    }
};

const computeNewOrder = (
    items: Orderable[],
    previousItemId: string | null,
    nextItemId: string | null
) => {
    if (items.length > 0 && previousItemId == null && nextItemId == null) {
        throw new NotFoundError('Invalid ordering id');
    }
    const previousOrder = extractOrder(items, previousItemId);
    const nextOrder = extractOrder(items, nextItemId);

    return generateKeyBetween(previousOrder, nextOrder);
};

export { computeNewOrder };
