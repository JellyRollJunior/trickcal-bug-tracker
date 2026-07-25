import type { Board, Section } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { boardIdParamSchema } from '@/features/boards/requestParams.schema.js';
import { toSectionDto } from '@/features/boards/section.mapper.js';
import { createSection } from '@/features/boards/section.service.js';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';

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
        const { boardId } = boardIdParamSchema.parse(req.params);
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
