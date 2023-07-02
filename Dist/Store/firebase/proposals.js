import { StoreAccessor, GetDoc, GetDocs } from "mobx-firelink";
import { fire } from "../../Utils/Database/Firelink.js";
export const GetProposal = StoreAccessor({ fire }, s => (id) => {
    if (id == null)
        return null;
    return GetDoc({ fire }, a => a.proposals.get(id));
});
export const GetProposals = StoreAccessor({ fire }, s => () => {
    return GetDocs({ fire }, a => a.proposals);
});
//# sourceMappingURL=proposals.js.map