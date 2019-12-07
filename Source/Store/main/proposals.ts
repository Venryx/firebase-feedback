import {Action} from "../../Utils/General/Action";
import {GetProposal} from "../firebase/proposals";
import {Proposal} from "../firebase/proposals/@Proposal";
import {observable} from "mobx";
import {store} from "..";

export class ACTProposalSelect extends Action<{id: string}> {}

export class Proposals {
	@observable selectedProposalID: string;
	@observable features_showCompleted: boolean;
	@observable issues_showCompleted: boolean;
}

export function GetSelectedProposalID(): string {
	return store.main.proposals.selectedProposalID;
}
export function GetSelectedProposal(): Proposal {
	let selectedID = GetSelectedProposalID();
	return GetProposal(selectedID);
}