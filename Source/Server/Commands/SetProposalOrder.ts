import {ProposalIndexSet} from "../../Store/firebase/userData";
import {GetDataAsync} from "../../Utils/Database/DatabaseHelpers";
import {Command} from "../Command";
import {CE} from "js-vextensions";

//@UserEdit
export class SetProposalOrder extends Command<{proposalID: string, userID: string, index: number}> {
	newIndexes: ProposalIndexSet;
	async Prepare() {
		let {proposalID, userID, index} = this.payload;

		let oldIndexes = await GetDataAsync("userData", userID, ".proposalIndexes") as ProposalIndexSet || {};
		let idsOrdered = CE(oldIndexes).VValues(true);
		let oldIndex = idsOrdered.indexOf(proposalID);
		if (index != -1) {
			CE(idsOrdered).Move(proposalID, index, true);
		} else {
			CE(idsOrdered).Remove(proposalID);
		}
		this.newIndexes = idsOrdered; //.ToMap();
	}
	async Validate() {
		/*let {event} = this.payload;
		AssertValidate(`BookEvent`, event, `Book-event invalid`);*/
	}
	
	GetDBUpdates() {
		let {userID, proposalID} = this.payload;

		let updates = {};
		updates[`userData/${userID}/.proposalIndexes`] = this.newIndexes;
		return updates;
	}
}