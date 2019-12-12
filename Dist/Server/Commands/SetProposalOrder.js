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
import { GetAsync, GetDoc, Command } from "mobx-firelink";
import { fire } from "../../Utils/Database/Firelink";
//@UserEdit
export class SetProposalOrder extends Command {
    Prepare() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let { proposalID, userID, index } = this.payload;
            let oldIndexes = ((_a = (yield GetAsync(() => GetDoc({ fire }, a => a.userData.get(userID))))) === null || _a === void 0 ? void 0 : _a.proposalIndexes) || {};
            let idsOrdered = CE(oldIndexes).VValues(true);
            let oldIndex = idsOrdered.indexOf(proposalID);
            if (index != -1) {
                CE(idsOrdered).Move(proposalID, index, true);
            }
            else {
                CE(idsOrdered).Remove(proposalID);
            }
            this.newIndexes = idsOrdered; //.ToMap();
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
        updates[`userData/${userID}/.proposalIndexes`] = this.newIndexes;
        return updates;
    }
}
//# sourceMappingURL=SetProposalOrder.js.map