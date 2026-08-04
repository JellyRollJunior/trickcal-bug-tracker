import { NotFoundError } from '@trickcal-bug-tracker/shared';

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
    assertNullOrInList,
    assertValidOrdering,
};
