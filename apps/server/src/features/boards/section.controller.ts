import type { Board, Section } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import { toSectionDto } from '@/features/boards/section.mapper.js';
import { createSection } from '@/features/boards/section.service.js';

const postSections = async (
    req: Request<
        { boardId: Board['id'] },
        {},
        {
            previousSectionId: Section['id'] | null;
            nextSectionId: Section['id'] | null;
            name: Section['name'];
        }
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const boardId = req.params.boardId;
        const { previousSectionId, nextSectionId, name } = { ...req.body };

        const newSection = await createSection({
            userId,
            boardId,
            previousSectionId,
            nextSectionId,
            name,
        });
        res.json(toSectionDto(newSection));
    } catch (error) {
        next(error);
    }
};

export { postSections };
