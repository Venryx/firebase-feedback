import {AddSchema} from "../../Server/Server";
import {GetData} from "../../Utils/Database/DatabaseHelpers";
import {CE} from "js-vextensions";

export interface UserData {
	proposalIndexes: ProposalIndexSet;
}

export type ProposalIndexSet = { [key: number]: string; }; // index -> proposalID
AddSchema({patternProperties: {"^[0-9]+$": {type: "number"}}}, "ProposalIndexSet");

export function GetProposalIndexes(userID: string): ProposalIndexSet {
	if (userID == null) return {};
	return GetData("userData", userID, ".proposalIndexes") || {};
}
export function GetProposalOrder(userID: string): string[] {
	return CE(GetProposalIndexes(userID)).VValues(true) as string[];
}
export function GetProposalIndex(userID: string, proposalID: string) {
	if (userID == null || proposalID == null) return null;
	let proposalIndexEntry = CE(GetProposalIndexes(userID)).Pairs().find(a=>a.value == proposalID);
	if (proposalIndexEntry == null) return null;
	return CE(proposalIndexEntry.key).ToInt();
}