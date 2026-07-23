import { SectionDto } from "./section.dto";

type BoardDto = {
    id: string;
    ownerId: string;
    creationDate: string;
    lastUpdate: string;
    name: string;
    description: string;
    sections: SectionDto[];
}

export { BoardDto }