import type { Board, Section } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import {
    boardIdAndSectionIdParamSchema,
    boardIdParamSchema,
} from '@trickcal-bug-tracker/shared';
import { toSectionDto } from '@/features/sections/section.mapper.js';
import { createSection } from '@/features/sections/section.service.js';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import { getIo } from '@/sockets/ioInstance.js';

const postSections = async (
    req: Request<
        { boardId: Board['id'] },
        {},
        {
            previousSectionId: Section['id'] | null;
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
        const { previousSectionId, name } = { ...req.body };

        const newSection = await createSection({
            userId,
            boardId,
            previousSectionId,
            name,
        });

        // emit section creation
        const sectionDto = toSectionDto(newSection);
        const io = getIo();
        io.sockets.to(boardId).emit('section:created', { boardId, section: sectionDto });

        res.json(toSectionDto(newSection));
    } catch (error) {
        next(error);
    }
};

const patchSection = async (
    req: Request<
        { boardId: Board['id']; sectionId: Section['id'] },
        {},
        Pick<Section, 'name'>
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        const { boardId, sectionId } = boardIdAndSectionIdParamSchema.parse(req.params);
        const { name } = req.body;
    } catch (error) {
        next(error);
    }
};

export { postSections, patchSection };
