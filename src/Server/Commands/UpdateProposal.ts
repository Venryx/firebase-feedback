import {Command} from "../Command";
import { GetDataAsync } from "../../Utils/Database/DatabaseHelpers";
import {WaitTillSchemaAddedThenRun, GetSchemaJSON, AddSchema, Schema, AssertValidate} from "../Server";
import {Proposal} from "./../../Store/firebase/proposals/@Proposal";

export type _MainType = Proposal;
let MTName = "Proposal";

WaitTillSchemaAddedThenRun(MTName, ()=> {
	AddSchema({
		properties: {
			id: {type: "number"},
			updates: Schema({
				properties: GetSchemaJSON(MTName).properties.Including("title", "text", "completedAt"),
			}),
		},
		required: ["id", "updates"],
	}, `Update${MTName}_payload`);
});

//@UserEdit
export class UpdateProposal extends Command<{id: number, updates: Partial<_MainType>}> {
	Validate_Early() {
		AssertValidate(`Update${MTName}_payload`, this.payload, `Payload invalid`);
	}

	oldData: _MainType;
	newData: _MainType;
	async Prepare() {
		let {id, updates} = this.payload;
		this.oldData = await GetDataAsync({addHelpers: false}, "proposals", id) as _MainType;
		this.newData = {...this.oldData, ...updates};
	}
	async Validate() {
		AssertValidate(MTName, this.newData, `New ${MTName.toLowerCase()}-data invalid`);
	}
	
	GetDBUpdates() {
		let {id} = this.payload;
		let updates = {};
		updates[`proposals/${id}`] = this.newData;
		return updates;
	}
}