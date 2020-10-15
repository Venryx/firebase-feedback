import { CE } from "js-vextensions";
import { Command, AssertV, WrapDBValue } from "mobx-firelink";
import { GetProposalsOrder } from "../../Store/firebase/userData";
export class SetProposalOrder extends Command {
    Validate() {
        let { proposalID, userID, index } = this.payload;
        //let oldIndexes = (await GetAsync(()=>GetDoc({fire}, a=>a.userData.get(userID))))?.proposalOrder || {};
        let oldOrder = GetProposalsOrder(userID, true);
        AssertV(oldOrder !== undefined, "oldOrder is still loading.");
        //let idsOrdered = CE(oldIndexes).VValues(true);
        //let newOrder = oldOrder.slice();
        this.newOrder = oldOrder.slice();
        //let oldIndex = oldOrder.indexOf(proposalID);
        if (index != -1) {
            CE(this.newOrder).Move(proposalID, index, true);
        }
        else {
            CE(this.newOrder).Remove(proposalID);
        }
        //this.newOrder = newOrder; //.ToMap();
        //AssertValidate(`BookEvent`, event, `Book-event invalid`);*/
    }
    GetDBUpdates() {
        let { userID, proposalID } = this.payload;
        let updates = {};
        updates[`userData/${userID}/.proposalsOrder`] = WrapDBValue(this.newOrder, { merge: true });
        return updates;
    }
}
//# sourceMappingURL=SetProposalOrder.js.map