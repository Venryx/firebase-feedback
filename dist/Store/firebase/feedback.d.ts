import { Proposal } from "./feedback/@Proposal";
export interface FeedbackData {
    general: FeedbackData_General;
    proposals: {
        [key: number]: Proposal;
    };
}
export interface FeedbackData_General {
    lastProposalID: number;
}
export declare function GetProposal(id: number): Proposal;
export declare function GetProposals(): Proposal[];
