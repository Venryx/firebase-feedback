export interface UserData {
    proposalsOrder: string[];
}
export declare const GetProposalsOrder: ((userID: string, undefinedForLoading?: boolean) => string[]) & {
    Wait: (userID: string, undefinedForLoading?: boolean) => string[];
};
export declare const GetProposalIndex: ((userID: string, proposalID: string) => number) & {
    Wait: (userID: string, proposalID: string) => number;
};
