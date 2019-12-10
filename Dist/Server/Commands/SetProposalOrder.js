import { CE } from "js-vextensions";
import { GetAsync, GetDoc, Command } from "mobx-firelink";
import { fire } from "../../Utils/Database/Firelink";
//@UserEdit
export class SetProposalOrder extends Command {
    async Prepare() {
        var _a;
        let { proposalID, userID, index } = this.payload;
        let oldIndexes = ((_a = (await GetAsync(() => GetDoc({ fire }, a => a.userData.get(userID))))) === null || _a === void 0 ? void 0 : _a.proposalIndexes) || {};
        let idsOrdered = CE(oldIndexes).VValues(true);
        let oldIndex = idsOrdered.indexOf(proposalID);
        if (index != -1) {
            CE(idsOrdered).Move(proposalID, index, true);
        }
        else {
            CE(idsOrdered).Remove(proposalID);
        }
        this.newIndexes = idsOrdered; //.ToMap();
    }
    async Validate() {
        /*let {event} = this.payload;
        AssertValidate(`BookEvent`, event, `Book-event invalid`);*/
    }
    GetDBUpdates() {
        let { userID, proposalID } = this.payload;
        let updates = {};
        updates[`userData/${userID}/.proposalIndexes`] = this.newIndexes;
        return updates;
    }
}
//# sourceMappingURL=SetProposalOrder.js.map