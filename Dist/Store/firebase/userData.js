import { StoreAccessor, GetDoc } from "mobx-firelink";
import { fire } from "../../Utils/Database/Firelink";
/*export type ProposalIndexSet = { [key: number]: string; }; // index -> proposalID
AddSchema({patternProperties: {"^[0-9]+$": {type: "number"}}}, "ProposalIndexSet");*/
/*export const GetProposalIndexes = StoreAccessor({fire}, s=>(userID: string): ProposalIndexSet => {
    if (userID == null) return {};
    return GetDoc({fire}, a=>a.userData.get(userID))?.proposalIndexes || {};
});
export const GetProposalOrder = StoreAccessor({fire}, s=>(userID: string): string[] => {
    return CE(GetProposalIndexes(userID)).VValues(true);
});*/
export const GetProposalsOrder = StoreAccessor({ fire }, s => (userID) => {
    var _a;
    if (userID == null)
        return [];
    return ((_a = GetDoc({ fire }, a => a.userData.get(userID))) === null || _a === void 0 ? void 0 : _a.proposalsOrder) || [];
});
export const GetProposalIndex = StoreAccessor({ fire }, s => (userID, proposalID) => {
    if (userID == null || proposalID == null)
        return null;
    /*let proposalIndexEntry = CE(GetProposalIndexes(userID)).Pairs().find(a=>a.value == proposalID);
    if (proposalIndexEntry == null) return null;
    return CE(proposalIndexEntry.key).ToInt();*/
    return GetProposalsOrder(userID).findIndex(id => id == proposalID);
});
//# sourceMappingURL=userData.js.map