import { AddSchema } from "../../Server/Server";
import { GetData } from "../../Utils/Database/DatabaseHelpers";
import { CE } from "js-vextensions";
AddSchema({ patternProperties: { "^[0-9]+$": { type: "number" } } }, "ProposalIndexSet");
export function GetProposalIndexes(userID) {
    if (userID == null)
        return {};
    return GetData("userData", userID, ".proposalIndexes") || {};
}
export function GetProposalOrder(userID) {
    return CE(GetProposalIndexes(userID)).VValues(true);
}
export function GetProposalIndex(userID, proposalID) {
    if (userID == null || proposalID == null)
        return null;
    let proposalIndexEntry = CE(GetProposalIndexes(userID)).Pairs().find(a => a.value == proposalID);
    if (proposalIndexEntry == null)
        return null;
    return CE(proposalIndexEntry.key).ToInt();
}
//# sourceMappingURL=userData.js.map