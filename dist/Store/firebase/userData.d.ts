export interface UserData {
    proposalIndexes: ProposalIndexSet;
}
export declare type ProposalIndexSet = {
    [key: number]: string;
};
export declare const GetProposalIndexes: (userID: string) => ProposalIndexSet;
export declare const GetProposalOrder: (userID: string) => string[];
export declare const GetProposalIndex: (userID: string, proposalID: string) => number;
