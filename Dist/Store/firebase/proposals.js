import { GetData } from "../../Utils/Database/DatabaseHelpers";
import { CachedTransform } from "js-vextensions";
export function GetProposal(id) {
    if (id == null)
        return null;
    return GetData("proposals", id);
}
export function GetProposals() {
    let entryMap = GetData({ collection: true }, "proposals");
    //return CachedTransform("GetProposals", [], entryMap, ()=>entryMap ? entryMap.VValues(true) : []);
    return CachedTransform("GetProposals", [], entryMap, () => entryMap ? entryMap.VValues(true).filter(a => a) : []); // filter() needed for some reason
}
//# sourceMappingURL=proposals.js.map