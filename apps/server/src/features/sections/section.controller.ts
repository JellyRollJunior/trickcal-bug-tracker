import type { Board, Section } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import {
    boardIdParamSchema,
    sectionIdParamSchema,
} from '@trickcal-bug-tracker/shared';
import { toSectionDto } from '@/features/sections/section.mapper.js';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import { getIo } from '@/sockets/ioInstance.js';
import * as sectionService from '@/features/sections/section.service.js';

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

        const newSection = await sectionService.createSection({
            userId,
            boardId,
            previousSectionId,
            name,
        });

        // emit section creation
        const sectionDto = toSectionDto(newSection);
        const io = getIo();
        io.sockets
            .to(boardId)
            .emit('section:created', { boardId, section: sectionDto });

        res.json(toSectionDto(newSection));
    } catch (error) {
        next(error);
    }
};

const patchSection = async (
    req: Request<{ sectionId: Section['id'] }, {}, Pick<Section, 'name'>>,
    res: Response,
    next: NextFunction
) => {
    try {
        // validate body
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const { sectionId } = sectionIdParamSchema.parse(req.params);
        const { name } = req.body;

        const section = await sectionService.editSection({
            userId,
            sectionId,
            name,
        });

        // emit
        const sectionDto = toSectionDto(section);
        const io = getIo();
        io.sockets.to(section.boardId).emit('section:edited', {
            boardId: section.boardId,
            section: sectionDto,
        });

        res.json(sectionDto);
    } catch (error) {
        next(error);
    }
};

const deleteSection = async (
    req: Request<{ sectionId: Section['id'] }, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const { sectionId } = sectionIdParamSchema.parse(req.params);

        const deletedSection = await sectionService.deleteSection({
            userId,
            sectionId,
        });

        const sectionDto = toSectionDto(deletedSection);
        const io = getIo();
        io.sockets
            .to(deletedSection.boardId)
            .emit('section:deleted', {
                boardId: deletedSection.boardId,
                section: sectionDto,
            });
        res.json(sectionDto);
    } catch (error) {
        next(error);
    }
};

export { postSections, patchSection, deleteSection };
