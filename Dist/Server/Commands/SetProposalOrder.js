var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CE } from "js-vextensions";
import { GetAsync, Command } from "mobx-firelink";
import { GetProposalsOrder } from "../../Store/firebase/userData";
//@UserEdit
export class SetProposalOrder extends Command {
    Prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            let { proposalID, userID, index } = this.payload;
            //let oldIndexes = (await GetAsync(()=>GetDoc({fire}, a=>a.userData.get(userID))))?.proposalOrder || {};
            let oldOrder = yield GetAsync(() => GetProposalsOrder(userID));
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
        });
    }
    Validate() {
        return __awaiter(this, void 0, void 0, function* () {
            /*let {event} = this.payload;
            AssertValidate(`BookEvent`, event, `Book-event invalid`);*/
        });
    }
    GetDBUpdates() {
        let { userID, proposalID } = this.payload;
        let updates = {};
        updates[`userData/${userID}/.proposalsOrder`] = this.newOrder;
        return updates;
    }
}
//# sourceMappingURL=SetProposalOrder.js.map