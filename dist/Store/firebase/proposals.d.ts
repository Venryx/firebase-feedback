import { Proposal } from "./proposals/@Proposal.js";
export declare const GetProposal: ((id: string) => Proposal) & {
    Wait: (id: string) => Proposal;
};
export declare const GetProposals: (() => Proposal[]) & {
    Wait: () => Proposal[];
};
