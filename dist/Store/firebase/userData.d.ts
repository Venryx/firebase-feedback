export interface UserData {
    proposalsOrder: string[];
}
export declare const GetProposalsOrder: (userID: string) => string[];
export declare const GetProposalIndex: (userID: string, proposalID: string) => number;
