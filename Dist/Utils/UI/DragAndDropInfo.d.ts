export declare class DroppableInfo {
    constructor(data: Partial<DroppableInfo>);
    type: "ProposalsColumn" | "ProposalsUserRankingColumn";
    proposalType: string;
    userID?: string;
}
export declare class DraggableInfo {
    constructor(data: Partial<DraggableInfo>);
    columnType?: string;
    proposalID?: string;
}
