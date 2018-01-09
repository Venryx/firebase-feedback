import {combineReducers} from "redux";
import {Action} from "../../Utils/Action";
import {GetProposal} from "../firebase/proposals";
import {Proposal} from "../firebase/proposals/@Proposal";
import {State} from "../../General";
import {SimpleReducer} from "../main";

export class ACTProposalSelect extends Action<{id: number}> {}

export class Proposals {
	selectedProposalID: number;
	features_showCompleted: boolean;
	issues_showCompleted: boolean;
}

export const ProposalsReducer = combineReducers({
	selectedProposalID: (state = null, action)=> {
		if (action.Is(ACTProposalSelect)) return action.payload.id;
		return state;
	},
	features_showCompleted: SimpleReducer(a=>a.proposals.features_showCompleted),
	issues_showCompleted: SimpleReducer(a=>a.proposals.issues_showCompleted),
}) as any;

export function GetSelectedProposalID(): number {
	return State("proposals", "selectedProposalID");
}
export function GetSelectedProposal(): Proposal {
	let selectedID = GetSelectedProposalID();
	return GetProposal(selectedID);
}