import { AddSchema } from "../../Server/Server";
import { CE } from "js-vextensions";
import { StoreAccessor, GetDoc } from "mobx-firelink";
import { fire } from "../../Utils/Database/Firelink";
AddSchema({ patternProperties: { "^[0-9]+$": { type: "number" } } }, "ProposalIndexSet");
export const GetProposalIndexes = StoreAccessor({ fire }, s => (userID) => {
    var _a;
    if (userID == null)
        return {};
    return ((_a = GetDoc({ fire }, a => a.userData.get(userID))) === null || _a === void 0 ? void 0 : _a.proposalIndexes) || {};
});
export const GetProposalOrder = StoreAccessor({ fire }, s => (userID) => {
    return CE(GetProposalIndexes(userID)).VValues(true);
});
export const GetProposalIndex = StoreAccessor({ fire }, s => (userID, proposalID) => {
    if (userID == null || proposalID == null)
        return null;
    let proposalIndexEntry = CE(GetProposalIndexes(userID)).Pairs().find(a => a.value == proposalID);
    if (proposalIndexEntry == null)
        return null;
    return CE(proposalIndexEntry.key).ToInt();
});
//# sourceMappingURL=userData.js.map