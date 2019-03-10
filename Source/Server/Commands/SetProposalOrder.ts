import {ProposalIndexSet} from "../../Store/firebase/userData";
import {GetDataAsync} from "../../Utils/Database/DatabaseHelpers";
import {Command} from "../Command";

//@UserEdit
export class SetProposalOrder extends Command<{proposalID: number, userID: string, index: number}> {
	newIndexes: ProposalIndexSet;
	async Prepare() {
		let {proposalID, userID, index} = this.payload;

		let oldIndexes = await GetDataAsync("userData", userID, ".proposalIndexes") as ProposalIndexSet || {};
		let idsOrdered = oldIndexes.VValues(true);
		let oldIndex = idsOrdered.indexOf(proposalID);
		if (index != -1) {
			idsOrdered.Move(proposalID, index, true);
		} else {
			idsOrdered.Remove(proposalID);
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