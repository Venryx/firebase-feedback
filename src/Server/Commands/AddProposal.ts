import {Assert} from "js-vextensions";
import {Command, MergeDBUpdates} from "../Command";
import { GetDataAsync } from "../../Utils/Database/DatabaseHelpers";
import { Proposal } from "../../index";

export type _MainType = Proposal;
let MTName = "Proposal";

//@UserEdit
export class AddProposal extends Command<{data: _MainType}> {
	id: number;
	async Prepare() {
		let {data} = this.payload;

		let lastProposalID = await GetDataAsync("general", "lastProposalID") as number;
		this.id = lastProposalID + 1;
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
			"general/lastProposalID": this.id,
			[`proposals/${this.id}`]: data,
		} as any;
		return updates;
	}
}