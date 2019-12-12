var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GetProposal } from "../../Store/firebase/proposals";
import { SetProposalOrder } from "./SetProposalOrder";
import { CE } from "js-vextensions";
import { GetAsync, GetDocs, Command, MergeDBUpdates } from "mobx-firelink";
import { fire } from "../../Utils/Database/Firelink";
//@UserEdit
export class DeleteProposal extends Command {
    Prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = this.payload;
            let proposal = yield GetAsync(() => GetProposal(id));
            //this.posts = await GetAsync(()=>GetProposalPosts(proposal));
            let userDatas = yield GetAsync(() => GetDocs({ fire }, a => a.userData));
            this.sub_removalsFromUserOrderings = [];
            let userDatasWithOrderingContainingProposal = userDatas.filter(userData => CE(CE(userData.proposalIndexes).VValues(true)).Contains(id));
            for (let userID of userDatasWithOrderingContainingProposal.map(userData => userData["_key"])) {
                let subcommand = new SetProposalOrder({ proposalID: id, userID, index: -1 });
                subcommand.Validate_Early();
                yield subcommand.Prepare();
                this.sub_removalsFromUserOrderings.push(subcommand);
            }
        });
    }
    Validate() {
        return __awaiter(this, void 0, void 0, function* () {
            /*if (this.posts.filter(a=>a.creator != this.userInfo.id && a.text).length) {
                throw new Error(`Proposals with responses by other people cannot be deleted.`);
            }*/
            for (let subcommand of this.sub_removalsFromUserOrderings) {
                yield subcommand.Validate();
            }
        });
    }
    GetDBUpdates() {
        let { id } = this.payload;
        let updates = {};
        updates[`proposals/${id}`] = null;
        /*for (let post of this.posts) {
            updates[`posts/${post._id}`] = null;
        }*/
        for (let subcommand of this.sub_removalsFromUserOrderings) {
            updates = MergeDBUpdates(updates, subcommand.GetDBUpdates());
        }
        return updates;
    }
}
//# sourceMappingURL=DeleteProposal.js.map