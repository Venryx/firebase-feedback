export declare class Proposal {
    constructor(initialData: Partial<Proposal>);
    _id: number;
    type: string;
    title: string;
    text: string;
    completed: boolean;
    creator: string;
    createdAt: number;
    editedAt: number;
}
