import {Command} from "../Command";
import {ProposalIndexSet} from "../../Store/firebase/userData";
import { GetDataAsync } from "../../Utils/Database/DatabaseHelpers";

//@UserEdit
export default class SetProposalOrder extends Command<{proposalID: number, index: number}> {
	newIndexes: ProposalIndexSet;
	async Prepare() {
		let {proposalID, index} = this.payload;

		let oldIndexes = await GetDataAsync("userData", this.userInfo.id, "proposalIndexes") as ProposalIndexSet || {};
		let idsOrdered = oldIndexes.VValues(true);
		let oldIndex = idsOrdered.indexOf(proposalID);
		idsOrdered.Move(proposalID, index);
		this.newIndexes = idsOrdered; //.ToMap();
	}
	async Validate() {
		/*let {event} = this.payload;
		AssertValidate(`BookEvent`, event, `Book-event invalid`);*/
	}
	
	GetDBUpdates() {
		let {proposalID} = this.payload;

		let updates = {};
		updates[`userData/${this.userInfo.id}/proposalIndexes`] = this.newIndexes;
		return updates;
	}
}