import { Proposal } from "../firebase/proposals/@Proposal.js";
export declare class Proposals {
    constructor();
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
