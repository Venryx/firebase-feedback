import { Action } from "../../Utils/General/Action";
import { Proposal } from "../firebase/proposals/@Proposal";
export declare class ACTProposalSelect extends Action<{
    id: string;
}> {
}
export declare class Proposals {
    selectedProposalID: string;
    features_showCompleted: boolean;
    issues_showCompleted: boolean;
}
export declare function GetSelectedProposalID(): string;
export declare function GetSelectedProposal(): Proposal;
