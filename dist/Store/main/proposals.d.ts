import { Action } from "../../Utils/Action";
import { Proposal } from "../firebase/proposals/@Proposal";
export declare class ACTProposalSelect extends Action<{
    id: number;
}> {
}
export declare class Proposals {
    selectedProposalID: number;
    features_showCompleted: boolean;
    issues_showCompleted: boolean;
}
export declare const ProposalsReducer: any;
export declare function GetSelectedProposalID(): number;
export declare function GetSelectedProposal(): Proposal;
