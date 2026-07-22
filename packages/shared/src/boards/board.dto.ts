import { Section } from "./section.dto";

type Board = {
    id: string;
    ownerId: string;
    creationDate: string;
    lastUpdate: string;
    name: string;
    description: string;
    sections: Section[];
}

export { Board }