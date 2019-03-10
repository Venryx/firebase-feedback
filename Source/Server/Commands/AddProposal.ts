import {Assert} from "js-vextensions";
import {Command, MergeDBUpdates} from "../Command";
import { GetDataAsync } from "../../Utils/Database/DatabaseHelpers";
import { Proposal } from "../../index";
import {AssertValidate} from "../Server";

export type _MainType = Proposal;
let MTName = "Proposal";

//@UserEdit
export class AddProposal extends Command<{data: _MainType}> {
	id: number;
	async Prepare() {
		let {data} = this.payload;

		let lastProposalID = await GetDataAsync("general", "data", ".lastProposalID") as number;
		this.id = lastProposalID + 1;
		data.creator = this.userInfo.id;
		data.createdAt = Date.now();
		//thread.editedAt = thread.createdAt;

		this.returnData = this.id;
	}
	async Validate() {
		let {data} = this.payload;
		AssertValidate(MTName, data, `${MTName} invalid`);
	}
	
	GetDBUpdates() {
		let {data} = this.payload;
		let updates = {
			"general/data/.lastProposalID": this.id,
			[`proposals/${this.id}`]: data,
		} as any;
		return updates;
	}
}