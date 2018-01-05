import {GetData} from "../../Utils/Database/DatabaseHelpers";
import {CachedTransform} from "../../Utils/VCache";
import { emptyArray } from "../../General";
import {Proposal} from "./feedback/@Proposal";

export interface FeedbackData {
	general: FeedbackData_General;
	proposals: {[key: number]: Proposal};
}
export interface FeedbackData_General {
	lastProposalID: number;
}

export function GetProposal(id: number): Proposal {
	if (id == null) return null;
	return GetData("proposals", id);
}
export function GetProposals(): Proposal[] {
	let entryMap = GetData("proposals");
	return CachedTransform("GetProposals", [], entryMap, ()=>entryMap ? entryMap.VValues(true) : []);
}