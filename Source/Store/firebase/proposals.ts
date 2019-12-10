import { Proposal } from "./proposals/@Proposal";
import {CachedTransform} from "js-vextensions";
import {StoreAccessor, GetDoc, GetDocs} from "mobx-firelink";
import {fire} from "../../Utils/Database/Firelink";

export const GetProposal = StoreAccessor({fire}, s=>(id: string): Proposal => {
	if (id == null) return null;
	return GetDoc({fire}, a=>a.proposals.get(id));
});
export const GetProposals = StoreAccessor({fire}, s=>(): Proposal[] => {
	return GetDocs({fire}, a=>a.proposals);
});