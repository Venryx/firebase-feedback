import {AddSchema} from "../../Server/Server.js";
import {CE} from "js-vextensions";
import {StoreAccessor, GetDoc} from "mobx-firelink";
import {fire} from "../../Utils/Database/Firelink.js";
import {emptyArray} from "../../General.js";

export interface UserData {
	//proposalIndexes: ProposalIndexSet;
	proposalsOrder: string[];
}

/*export type ProposalIndexSet = { [key: number]: string; }; // index -> proposalID
AddSchema({patternProperties: {"^[0-9]+$": {type: "number"}}}, "ProposalIndexSet");*/

/*export const GetProposalIndexes = StoreAccessor({fire}, s=>(userID: string): ProposalIndexSet => {
	if (userID == null) return {};
	return GetDoc({fire}, a=>a.userData.get(userID))?.proposalIndexes || {};
});
export const GetProposalOrder = StoreAccessor({fire}, s=>(userID: string): string[] => {
	return CE(GetProposalIndexes(userID)).VValues(true);
});*/
export const GetProposalsOrder = StoreAccessor({fire}, s=>(userID: string, undefinedForLoading = false): string[] => {
	if (userID == null) return emptyArray;
	let userData = GetDoc({fire}, a=>a.userData.get(userID));
	if (undefinedForLoading && userData === undefined) return undefined; // undefined from mobx-firelink means still loading
	return userData?.proposalsOrder || emptyArray;
});
export const GetProposalIndex = StoreAccessor({fire}, s=> (userID: string, proposalID: string) => {
	if (userID == null || proposalID == null) return null;
	/*let proposalIndexEntry = CE(GetProposalIndexes(userID)).Pairs().find(a=>a.value == proposalID);
	if (proposalIndexEntry == null) return null;
	return CE(proposalIndexEntry.key).ToInt();*/
	//return GetProposalsOrder(userID).findIndex(id=>id == proposalID);
	return GetProposalsOrder(userID).indexOf(proposalID);
});