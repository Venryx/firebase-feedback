import {AddSchema} from "../../Server/Server";
import {GetData} from "../../Utils/Database/DatabaseHelpers";

export interface UserData {
	proposalIndexes: ProposalIndexSet;
}

export type ProposalIndexSet = { [key: number]: number; }; // index -> proposalID
AddSchema({patternProperties: {"^[0-9]+$": {type: "number"}}}, "ProposalIndexSet");

export function GetProposalIndexes(userID: string): ProposalIndexSet {
	if (userID == null) return {};
	return GetData("userData", userID, ".proposalIndexes") || {};
}
export function GetProposalOrder(userID: string): number[] {
	return GetProposalIndexes(userID).VValues(true);
}
export function GetProposalIndex(userID: string, proposalID: number) {
	if (userID == null || proposalID == null) return null;
	let proposalIndexEntry = GetProposalIndexes(userID).Props().find(a=>a.value == proposalID);
	if (proposalIndexEntry == null) return null;
	return proposalIndexEntry.name.ToInt();
}