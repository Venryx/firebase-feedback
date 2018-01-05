import { Action } from "../Utils/Action";
import { Proposal } from "../index";
export declare class ACTProposalSelect extends Action<{
    id: number;
}> {
}
export declare class Feedback {
    selectedProposalID: number;
}
export declare const FeedbackReducer: any;
export declare function GetSelectedProposalID(): number;
export declare function GetSelectedProposal(): Proposal;
