export interface UserData {
    proposalIndexes: ProposalIndexSet;
}
export declare type ProposalIndexSet = {
    [key: number]: number;
};
export declare function GetProposalIndexes(userID: string): {};
export declare function GetProposalOrder(userID: string): {}[];
export declare function GetProposalIndex(userID: string, proposalID: number): number;
