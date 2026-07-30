import { prisma } from '@/db/prisma.js';
import { User } from '@prisma/client';

const getUserById = async ({ id }: Pick<User, 'id'>) => {
    try {
        const data = await prisma.user.findFirst({
            where: {
                id: id,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to fetch user');
    }
};

const getUserByUsername = async ({ username }: Pick<User, 'username'>) => {
    try {
        const data = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to fetch user');
    }
};

const getUserByGithubId = async ({ githubId }: Pick<User, 'githubId'>) => {
    try {
        if (!githubId) return null;
        const data = await prisma.user.findUnique({
            where: {
                githubId: githubId,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to fetch user');
    }
};

const createUser = async ({
    username,
    password,
    name,
}: Pick<User, 'username' | 'password' | 'name'>) => {
    try {
        const data = await prisma.user.create({
            data: {
                username,
                password,
                name,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to create user');
    }
};

const createGithubUser = async ({
    githubId,
    name,
}: Pick<User, 'githubId' | 'name'>) => {
    try {
        const data = await prisma.user.create({
            data: {
                githubId: githubId,
                name: name,
            },
        });
        return data;
    } catch (error) {
        throw new Error('Unable to create user');
    }
};

export {
    getUserById,
    getUserByUsername,
    getUserByGithubId,
    createUser,
    createGithubUser,
};
