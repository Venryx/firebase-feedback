import { Proposal } from "./proposals/@Proposal";
export declare const GetProposal: ((id: string) => Proposal) & {
    Wait: (id: string) => Proposal;
};
export declare const GetProposals: (() => Proposal[]) & {
    Wait: () => Proposal[];
};
