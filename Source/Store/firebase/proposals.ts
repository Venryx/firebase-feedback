import { GetData } from "../../Utils/Database/DatabaseHelpers";
import { CachedTransform } from "../../Utils/VCache";
import { Proposal } from "./proposals/@Proposal";

export function GetProposal(id: number): Proposal {
	if (id == null) return null;
	return GetData("proposals", id);
}
export function GetProposals(): Proposal[] {
	let entryMap = GetData("proposals");
	//return CachedTransform("GetProposals", [], entryMap, ()=>entryMap ? entryMap.VValues(true) : []);
	return CachedTransform("GetProposals", [], entryMap, ()=>entryMap ? entryMap.VValues(true).filter(a=>a) : []); // filter() needed for some reason
}