export interface UserData {
    proposalIndexes: ProposalIndexSet;
}
export declare type ProposalIndexSet = {
    [key: number]: number;
};
export declare function GetProposalIndexes(userID: string): ProposalIndexSet;
export declare function GetProposalOrder(userID: string): number[];
export declare function GetProposalIndex(userID: string, proposalID: number): number;
