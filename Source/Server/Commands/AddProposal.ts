import {Assert} from "js-vextensions";
import { Proposal } from "../../index.js";
import {AssertValidate} from "../Server.js";
import {GenerateUUID} from "../../Utils/General/KeyGenerator.js";
import {Command} from "mobx-firelink";

export type _MainType = Proposal;
let MTName = "Proposal";

//@UserEdit
export class AddProposal extends Command<{data: _MainType}, string> {
	id: string;
	Validate() {
		let {data} = this.payload;

		this.id = this.id ?? GenerateUUID();
		data.creator = this.userInfo.id;
		data.createdAt = Date.now();
		//thread.editedAt = thread.createdAt;

		this.returnData = this.id;
		AssertValidate(MTName, data, `${MTName} invalid`);
	}
	
	GetDBUpdates() {
		let {data} = this.payload;
		let updates = {
			[`proposals/${this.id}`]: data,
		};
		return updates;
	}
}