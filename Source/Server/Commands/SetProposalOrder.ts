import {CE} from "js-vextensions";
import {GetAsync, GetDoc, Command} from "mobx-firelink";
import {fire} from "../../Utils/Database/Firelink";
import {GetProposalsOrder} from "../../Store/firebase/userData";

//@UserEdit
export class SetProposalOrder extends Command<{proposalID: string, userID: string, index: number}> {
	newOrder: string[];
	async Prepare() {
		let {proposalID, userID, index} = this.payload;

		//let oldIndexes = (await GetAsync(()=>GetDoc({fire}, a=>a.userData.get(userID))))?.proposalOrder || {};
		let oldOrder = await GetAsync(()=>GetProposalsOrder(userID));
		//let idsOrdered = CE(oldIndexes).VValues(true);
		//let newOrder = oldOrder.slice();
		this.newOrder = oldOrder.slice();
		
		//let oldIndex = oldOrder.indexOf(proposalID);
		if (index != -1) {
			CE(this.newOrder).Move(proposalID, index, true);
		} else {
			CE(this.newOrder).Remove(proposalID);
		}
		//this.newOrder = newOrder; //.ToMap();
	}
	async Validate() {
		/*let {event} = this.payload;
		AssertValidate(`BookEvent`, event, `Book-event invalid`);*/
	}
	
	GetDBUpdates() {
		let {userID, proposalID} = this.payload;

		let updates = {};
		updates[`userData/${userID}/.proposalsOrder`] = this.newOrder;
		return updates;
	}
}