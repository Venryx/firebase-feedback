import {Proposal} from "./proposals/@Proposal";
import {GetData} from "../../Utils/Database/DatabaseHelpers";
import {CachedTransform} from "../../Utils/VCache";

export function GetProposal(id: number): Proposal {
	if (id == null) return null;
	return GetData("proposals", id);
}
export function GetProposals(): Proposal[] {
	let entryMap = GetData("proposals");
	return CachedTransform("GetProposals", [], entryMap, ()=>entryMap ? entryMap.VValues(true) : []);
}