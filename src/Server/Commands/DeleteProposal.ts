import {Assert} from "js-vextensions";
import {Command, MergeDBUpdates} from "../Command";
import { GetAsync } from "../../Utils/Database/DatabaseHelpers";
import {GetProposal} from "../../Store/firebase/proposals";

//@UserEdit
export class DeleteProposal extends Command<{id: number}> {
	//posts: Post[];
	async Prepare() {
		let {id} = this.payload;
		let proposal = await GetAsync(()=>GetProposal(id))
		//this.posts = await GetAsync(()=>GetProposalPosts(proposal));
	}
	async Validate() {
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
		return updates;
	}
}