import {GetProposal} from "../firebase/proposals";
import {Proposal} from "../firebase/proposals/@Proposal";
import {observable} from "mobx";
import {StoreAccessor} from "mobx-firelink";
import {fire} from "../../Utils/Database/Firelink";

export class Proposals {
	@observable selectedProposalID: string;
	@observable features_showCompleted: boolean;
	@observable issues_showCompleted: boolean;
}

export const GetSelectedProposalID = StoreAccessor({fire}, s => (): string => {
	return s.main.proposals.selectedProposalID;
});
export const GetSelectedProposal = StoreAccessor({fire}, s => (): Proposal => {
	let selectedID = GetSelectedProposalID();
	return GetProposal(selectedID);
});