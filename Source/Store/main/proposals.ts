import {GetProposal} from "../firebase/proposals.js";
import {Proposal} from "../firebase/proposals/@Proposal.js";
import {makeObservable, observable} from "mobx";
import {StoreAccessor} from "mobx-firelink";
import {fire} from "../../Utils/Database/Firelink.js";

export class Proposals {
	constructor() { makeObservable(this); }
	@observable selectedProposalID: string;
	@observable features_showCompleted: boolean;
	@observable issues_showCompleted: boolean;
}

export const GetSelectedProposalID = StoreAccessor({fire}, s => (): string => {
	//console.log("NewVal:", s.main.proposals.selectedProposalID);
	return s.main.proposals.selectedProposalID;
});
export const GetSelectedProposal = StoreAccessor({fire}, s => (): Proposal => {
	let selectedID = GetSelectedProposalID();
	return GetProposal(selectedID);
});