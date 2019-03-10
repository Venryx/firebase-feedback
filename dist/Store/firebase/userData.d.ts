export interface UserData {
    proposalIndexes: ProposalIndexSet;
}
export declare type ProposalIndexSet = {
    [key: number]: string;
};
export declare function GetProposalIndexes(userID: string): ProposalIndexSet;
export declare function GetProposalOrder(userID: string): string[];
export declare function GetProposalIndex(userID: string, proposalID: string): number;
