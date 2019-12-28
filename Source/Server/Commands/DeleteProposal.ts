import {GetProposal} from "../../Store/firebase/proposals";
import {SetProposalOrder} from "./SetProposalOrder";
import {CE} from "js-vextensions";
import {GetAsync, GetDocs, Command, MergeDBUpdates, AssertV} from "mobx-firelink";
import {fire} from "../../Utils/Database/Firelink";

//@UserEdit
export class DeleteProposal extends Command<{id: string}> {
	//posts: Post[];
	sub_removalsFromUserOrderings: SetProposalOrder[];
	Validate() {
		let {id} = this.payload;
		let proposal = GetProposal(id);
		AssertV(proposal, "proposal is null.");
		//this.posts = await GetAsync(()=>GetProposalPosts(proposal));

		let userDatas = GetDocs({fire, undefinedForLoading: true}, a=>a.userData);
		AssertV(userDatas, "userDatas is still loading.");
		this.sub_removalsFromUserOrderings = [];
		//let userDatasWithOrderingContainingProposal = userDatas.filter(userData=>CE(CE(userData.proposalIndexes).VValues(true)).Contains(id));
		let userDatasWithOrderingContainingProposal = userDatas.filter(userData=>CE(userData.proposalsOrder).Contains(id));
		for (let userID of userDatasWithOrderingContainingProposal.map(userData=>userData["_key"])) {
			let subcommand = new SetProposalOrder({fire}, {proposalID: id, userID, index: -1});
			subcommand.Validate();
			this.sub_removalsFromUserOrderings.push(subcommand);
		}

		/*if (this.posts.filter(a=>a.creator != this.userInfo.id && a.text).length) {
			throw new Error(`Proposals with responses by other people cannot be deleted.`);
		}*/
	}

	GetDBUpdates() {
		let {id} = this.payload;
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