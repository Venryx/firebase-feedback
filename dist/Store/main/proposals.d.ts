import { Proposal } from "../firebase/proposals/@Proposal";
export declare class Proposals {
    selectedProposalID: string;
    features_showCompleted: boolean;
    issues_showCompleted: boolean;
}
export declare const GetSelectedProposalID: (() => string) & {
    Wait: () => string;
};
export declare const GetSelectedProposal: (() => Proposal) & {
    Wait: () => Proposal;
};
