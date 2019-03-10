import { GetData } from "../../Utils/Database/DatabaseHelpers";
import { Proposal } from "./proposals/@Proposal";
import {CachedTransform} from "js-vextensions";

export function GetProposal(id: string): Proposal {
	if (id == null) return null;
	return GetData("proposals", id);
}
export function GetProposals(): Proposal[] {
	let entryMap = GetData({collection: true}, "proposals");
	//return CachedTransform("GetProposals", [], entryMap, ()=>entryMap ? entryMap.VValues(true) : []);
	return CachedTransform("GetProposals", [], entryMap, ()=>entryMap ? entryMap.VValues(true).filter(a=>a) : []); // filter() needed for some reason
}