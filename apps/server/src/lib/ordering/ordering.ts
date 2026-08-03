import { NotFoundError } from '@trickcal-bug-tracker/shared';
import { generateKeyBetween } from 'fractional-indexing';

type Orderable = {
    id: string;
    order: string;
};

/* Helpers */
const getNextIndexInList = (currentId: string | null, list: Orderable[]) => {
    if (currentId == null) {
        return list.length > 0 ? 0 : null;
    }
    const currentIndex = list.findIndex((item) => item.id === currentId);
    const nextIndex = currentIndex + 1;
    return nextIndex < list.length ? nextIndex : null;
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

/* validations */
const assertNullOrInList = (
    itemId: string | null,
    list: Orderable[],
    errorMessage?: string
) => {
    if (itemId !== null) {
        if (!list.some((item) => item.id === itemId)) {
            throw new NotFoundError(errorMessage ?? 'item not in list');
        }
    }
};

const assertValidOrdering = (
    items: Orderable[],
    previousItem: Orderable | null,
    nextItem: Orderable | null
) => {
    if (items.length > 0 && previousItem === null && nextItem === null) {
        throw new NotFoundError('Invalid ordering detected');
    }
};

export {
    getNextIndexInList,
    computeNewOrder,
    assertNullOrInList,
    assertValidOrdering,
};
