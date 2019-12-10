import { GetProposal } from "../../Store/firebase/proposals";
import { SetProposalOrder } from "./SetProposalOrder";
import { CE } from "js-vextensions";
import { GetAsync, GetDocs, Command, MergeDBUpdates } from "mobx-firelink";
import { fire } from "../../Utils/Database/Firelink";
//@UserEdit
export class DeleteProposal extends Command {
    async Prepare() {
        let { id } = this.payload;
        let proposal = await GetAsync(() => GetProposal(id));
        //this.posts = await GetAsync(()=>GetProposalPosts(proposal));
        let userDatas = await GetAsync(() => GetDocs({ fire }, a => a.userData));
        this.sub_removalsFromUserOrderings = [];
        let userDatasWithOrderingContainingProposal = userDatas.filter(userData => CE(CE(userData.proposalIndexes).VValues(true)).Contains(id));
        for (let userID of userDatasWithOrderingContainingProposal.map(userData => userData["_key"])) {
            let subcommand = new SetProposalOrder({ proposalID: id, userID, index: -1 });
            subcommand.Validate_Early();
            await subcommand.Prepare();
            this.sub_removalsFromUserOrderings.push(subcommand);
        }
    }
    async Validate() {
        /*if (this.posts.filter(a=>a.creator != this.userInfo.id && a.text).length) {
            throw new Error(`Proposals with responses by other people cannot be deleted.`);
        }*/
        for (let subcommand of this.sub_removalsFromUserOrderings) {
            await subcommand.Validate();
        }
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