import {GetProposal} from "../../Store/firebase/proposals";
import {GetAsync, GetDataAsync} from "../../Utils/Database/DatabaseHelpers";
import {Command, MergeDBUpdates} from "../Command";
import SetProposalOrder from "./SetProposalOrder";

//@UserEdit
export class DeleteProposal extends Command<{id: number}> {
	//posts: Post[];
	sub_removalsFromUserOrderings: SetProposalOrder[];
	async Prepare() {
		let {id} = this.payload;
		let proposal = await GetAsync(()=>GetProposal(id))
		//this.posts = await GetAsync(()=>GetProposalPosts(proposal));

		let userDatas = (await GetDataAsync({collection: true}, "userData") as Object) || {};
		this.sub_removalsFromUserOrderings = [];
		let userDatasWithOrderingContainingProposal = userDatas.Props(true).filter(prop=>prop.value["proposalIndexes"].VValues(true).Contains(id));
		for (let userID of userDatasWithOrderingContainingProposal.map(prop=>prop.name)) {
			let subcommand = new SetProposalOrder({proposalID: id, userID, index: -1});
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